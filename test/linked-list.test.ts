import {SinglyLinkedList} from "../src/linked-list";

const mockData = {
  emptyList: {
    _listLength: 0,
    _head: null,
    _tail: null},
  appendedDataToList: {
    _listLength: 1,
    _head: { _value: 1, _next: null },
    _tail: { _value: 1, _next: null }
  },
  getByIndex: {
    _value: 2,
    _next: { _value: 3, _next: null } },
  clonedList: {
    _listLength: 3,
    _head: { _value: 4, _next: { _value: 2231, _next: { _value: 53, _next: null } }},
    _tail: { _value: 53, _next: null }
  },
  clonedListWithoutChanges: {
    _listLength: 3,
    _head: { _value: 1, _next: { _value: 2, _next: { _value: 3, _next: null } }},
    _tail: { _value: 3, _next: null }
  },
  reversedList: {
    _listLength: 3,
    _head: {
      _value: 45743,
      _next: { _value: 867, _next: { _value: 23, _next: null } }
    },
    _tail: { _value: 23, _next: null }
  },
};

describe('Testing Singly Linked List', () => {
  it('should create linked list', () => {
    expect(new SinglyLinkedList()).toEqual(mockData.emptyList);
  });

  it('should return 0 for length()', () => {
    expect(new SinglyLinkedList().length()).toBe(0);
  });

  it('should add element to the end of the list', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);

    expect(list).toEqual(mockData.appendedDataToList);
  });

  it('should insert element by index at first place', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);

    list.insert(1111, 0);

    expect(list.findFirst(1111)).toEqual(0);
  });

  it('should insert element by index', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);
    list.append(5);

    list.insert(2001, 2);

    expect(list.get(2)!.value).toEqual(2001);
  });

  it('should not insert element by index which is not exist', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    expect(() => {list.insert(2001, 3)}).toThrow('Can\'t get element with index 3');
  });

  it('should not delete element by negative index', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    expect(() => {list.remove(-1)}).toThrow('Can\'t get element with index -1');
  });

  it('should not delete element by out of bound index', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    expect(() => {list.remove(5)}).toThrow('Can\'t get element with index 5');
  });

  it('should delete element by index', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.remove(1)).toEqual(2);
    expect(list.length()).toEqual(2);
  });

  it('should delete all matches with element', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(3);
    list.append(3);
    list.append(4);
    list.append(5);

    list.removeAll(3);

    expect(list.length()).toEqual(4);
    expect(list.get(2)!.value).toEqual(4);
    expect(list.get(3)!.value).toEqual(5);
  });

  it('should not change list by delete element which is not exist', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);
    list.append(5);

    const listLengthBeforeRemoving: number = list.length();

    list.removeAll(6);
    expect(list.length()).toEqual(listLengthBeforeRemoving);
  });

  it('should return singly linked object by index', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.get(1)).toEqual(mockData.getByIndex);
  });

  it('should throw exception by using incorrect index', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);

    expect(() => {list.get(5)}).toThrow('Can\'t get element with index 5');
    expect(() => {list.get(-1)}).toThrow('Can\'t get element with index -1');
  });

  it('should successfully clone linked list', () => {
    const listFirst: SinglyLinkedList = new SinglyLinkedList();
    listFirst.append(4);
    listFirst.append(2231);
    listFirst.append(53);

    let clonedList: SinglyLinkedList | null;

    clonedList = listFirst.clone();

    expect(clonedList!.length()).toEqual(3);
    expect(clonedList).toEqual(mockData.clonedList);
  });

  it('should successfully reverse linked list', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(23);
    list.append(867);
    list.append(45743);

    list.reverse();

    expect(list!.length()).toEqual(3);
    expect(list).toEqual(mockData.reversedList);
  });

  it('should find first element and return index', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(9865);
    list.append(674);
    list.append(3025);
    list.append(674);
    list.append(674);

    expect(list.findFirst(674)).toEqual(1);
  });

  it('should find last element and return index', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(9865);
    list.append(674);
    list.append(3025);
    list.append(674);
    list.append(674);

    expect(list.findLast(674)).toEqual(4);
  });

  it('should clear linked list', () => {
    const list: SinglyLinkedList = new SinglyLinkedList();
    list.append(53);
    list.append(4);
    list.append(122);

    list.clear();

    expect(list!.length()).toEqual(0);
    expect(list).toEqual(mockData.emptyList);
  });

  it('should list extend another list', () => {
    let listF: SinglyLinkedList = new SinglyLinkedList();
    let listS: SinglyLinkedList = new SinglyLinkedList();

    listF.append(1);
    listF.append(2);
    listF.append(3);

    listS.append(4);
    listS.append(5);
    listS.append(6);

    listF.extend(listS);

    expect(listF!.length()).toEqual(6);
    expect(listF.get(3)!.value).toEqual(4);
  });
});