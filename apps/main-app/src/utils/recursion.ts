// 递归练习

// 1.递归删除树结构中的指定属性

// 递归删除树结构中的指定属性
function removeProperty(tree, propertyName) {
  // 如果是数组，遍历每个元素并递归处理
  if (Array.isArray(tree)) {
    return tree.map(node => removeProperty(node, propertyName))
  }

  // 如果是对象，处理当前对象及其子节点
  if (typeof tree === 'object' && tree !== null) {
    // 创建一个新对象，避免修改原对象（可选，根据需求决定是否深拷贝）
    const newNode = { ...tree }

    // 删除指定属性
    if (propertyName in newNode) {
      delete newNode[propertyName]
    }

    // 递归处理子节点（假设子节点存储在children属性中）
    if (newNode.children && Array.isArray(newNode.children)) {
      newNode.children = removeProperty(newNode.children, propertyName)
    }

    return newNode
  }

  // 非对象/数组类型直接返回
  return tree
}

// 示例用法
const treeData = [
  {
    id: 1,
    name: 'Root',
    visible: true,
    children: [
      {
        id: 2,
        name: 'Node 1',
        visible: true,
        children: [{ id: 4, name: 'Leaf 1', visible: false }]
      },
      {
        id: 3,
        name: 'Node 2',
        visible: true,
        children: []
      }
    ]
  }
]

// 删除所有节点的visible属性
const result = removeProperty(treeData, 'visible')
console.log('删除属性后的树结构:', result)

// -----------------------------------

function flattenTree(nodes) {
  const result = []

  nodes.forEach(node => {
    const { children, ...rest } = node
    result.push(rest)

    if (Array.isArray(children)) {
      result.push(...flattenTree(children))
    }
  })

  return result
}

// 示例用法
const nestedTree = [
  {
    id: 1,
    name: '一级节点A',
    children: [
      {
        id: 11,
        name: '二级节点A1',
        children: [{ id: 111, name: '三级节点A11' }]
      },
      { id: 12, name: '二级节点A2' }
    ]
  },
  {
    id: 2,
    name: '一级节点B'
  }
]

const flattened = flattenTree(nestedTree)
console.log(flattened)

/* 输出结果：
[
  { id: 1, name: '一级节点A' },
  { id: 11, name: '二级节点A1' },
  { id: 111, name: '三级节点A11' },
  { id: 12, name: '二级节点A2' },
  { id: 2, name: '一级节点B' }
]
*/

// 递归函数：计算1到n的和
function sumRecursive(n) {
  if (n === 1) {
    return 1
  }
  return n + sumRecursive(n - 1)
}

// 计算1到500的和
const result1 = sumRecursive(500)

console.log('1到500的和为：', result1) // 输出结果为125250
