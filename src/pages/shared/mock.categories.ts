import { Category } from './category';
export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: '电脑整机',
    children: [
      {
        id: 11,
        name: '笔记本',
        children: []
      },
      {
        id: 12,
        name: '台式机',
        children: []
      },
      {
        id: 13,
        name: '平板电脑',
        children: []
      }
    ]
  },
  {
    id: 2,
    name: '电脑配件',
    children: [
      {
        id: 21,
        name: 'CPU',
        children: []
      },
      {
        id: 22,
        name: '内存',
        children: []
      }
    ]
  },
  {
    id: 3,
    name: '外设产品',
    children: [
      {
        id: 31,
        name: '鼠标',
        children: []
      },
      {
        id: 32,
        name: '键盘',
        children: []
      },
      {
        id: 33,
        name: 'U盘',
        children: []
      }
    ]
  },
  {
    id: 4,
    name: '网络产品',
    children: [
      {
        id: 41,
        name: '路由器',
        children: []
      },
      {
        id: 42,
        name: '交换机',
        children: []
      },
      {
        id: 43,
        name: '网卡',
        children: []
      },
      {
        id: 44,
        name: '网络配件',
        children: []
      }
    ]
  },
  {
    id: 5,
    name: '默认类别',
    children: []
  }
];
