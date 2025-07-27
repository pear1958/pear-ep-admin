import CryptoES from 'crypto-es'
import JSEncrypt from 'jsencrypt'
import { exchangeKey, getPublicKey } from '../modules/auth'

export class EncryptService {
  // 对称密钥, 由前端生成  只不过用后端给的 publicKey 进行加密了，然后发送给了后端而已
  private secretKey: CryptoES.lib.WordArray
  private initialized = false

  async init(): Promise<void> {
    if (this.initialized) return

    try {
      // 1.从服务器获取 RSA 公钥  RSA: 非对称加密算法
      // 公钥 可以公开，用于加密数据  私钥：必须保密，用于解密用公钥加密的数据
      const { data: publicKey } = await getPublicKey()

      // 2.前端生成AES密钥（16字节）
      const secretKey = CryptoES.lib.WordArray.random(16)

      // 3.用 RSA公钥 加密AES密钥（防止传输过程中泄露）
      const encryptor = new JSEncrypt()
      encryptor.setPublicKey(publicKey)
      const encryptedKey = encryptor.encrypt(secretKey.toString(CryptoES.enc.Utf8))

      // 4.将加密后的AES密钥发送给服务器（服务器用私钥解密并绑定到当前会话）
      // 后端用自己的私钥解密，得到前端生成的 secretKey，自此前后端拥有了相同的 secretKey
      await exchangeKey({
        encryptedKey
      })

      this.secretKey = secretKey
      this.initialized = true
    } catch (error) {
      console.error('加密服务初始化失败:', error)
    }
  }

  /**
   * 加密数据
   * @param data 要加密的数据, 可以是任意类型
   * @return 加密后的字符串
   */
  encrypt(data: any): { encryptData: string; iv: string } {
    if (!this.initialized || !this.secretKey) {
      return
    }
    const iv = CryptoES.lib.WordArray.random(16) // 16位向量
    const strData = JSON.stringify(data)

    // AES（Advanced Encryption Standard，高级加密标准） 对称加密算法
    const encrypted = CryptoES.AES.encrypt(strData, this.secretKey, {
      iv, // Initialization Vector，初始向量
      mode: CryptoES.mode.CBC, // 每个箱子打包前，都会和前一个箱子 贴个联动标签
      padding: CryptoES.pad.Pkcs7 // 相当于 不满一箱时的填充物
    })

    // 返回密文和iv（iv转为Base64字符串，方便传输）
    return {
      encryptData: encrypted.toString(),
      iv: CryptoES.enc.Base64.stringify(iv)
    }
  }

  /**
   * 解密数据
   * @param encryptData 加密后的字符串
   * @returns 解密后的原始数据
   */
  decrypt<T = any>(encryptData: string, iv: string): T {
    if (!this.initialized || !this.secretKey) {
      return
    }

    const ivWordArray = CryptoES.enc.Base64.parse(iv)

    // 解密
    const decrypted = CryptoES.AES.decrypt(encryptData, this.secretKey, {
      iv: ivWordArray,
      mode: CryptoES.mode.CBC,
      padding: CryptoES.pad.Pkcs7
    })

    // 将 解密结果 转换为 JSON 对象
    const strData = decrypted.toString(CryptoES.enc.Utf8)

    return JSON.parse(strData) as T
  }
}

const encryptService = new EncryptService()

export default encryptService
