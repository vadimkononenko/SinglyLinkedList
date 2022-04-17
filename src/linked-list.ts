class ListNode {
  private _value: number;
  public get value(): number {
    return this._value;
  }
  public set value(v: number) {
    this._value = v;
  }

  private _next: ListNode | null;
  public get next(): ListNode | null {
    return this._next;
  }
  public set next(v: ListNode | null) {
    this._next = v;
  }

  constructor(nodeValue: number) {
    this._value = nodeValue;
    this._next = null;
  }
}

export class SinglyLinkedList {
  private _head: ListNode | null;
  public get head(): ListNode | null {
    return this._head;
  }
  private set head(node: ListNode | null) {
    this._head = node;
  }

  private _tail: ListNode | null;
  public get tail(): ListNode | null {
    return this._tail;
  }
  private set tail(node: ListNode | null) {
    this._tail = node;
  }

  private _listLength: number;
  public get listLength(): number {
    return this._listLength;
  }
  private set listLength(v: number) {
    this._listLength = v;
  }

  constructor() {
    this._listLength = 0;
    this._head = null;
    this._tail = null;
  }

  public length(): number {
    return this._listLength;
  }

  public append(element: number): void {
    let newNode = new ListNode(element);

    if (this._head === null) {
      this._head = newNode;
      this._tail = this._head;
    } else {
      this._tail!.next = newNode;
      this._tail = newNode;
    }

    this._listLength++;
  }

  public insert(element: number, index: number): void {
    let node = this.get(index);

    if (node) {
      node.value = element;
    }
  }

  public remove(index: number): number {
    if (index < 0 || index > this._listLength - 1) {
      throw Error(`Can't get element with index ${index}`);
    } else if (index === 0) {
      return this.shift();
    } else if (index === this._listLength - 1) {
      return this.pop();
    } else {
      const prevNode = this.get(index - 1);
      const removeNode = prevNode!.next;

      prevNode!.next = removeNode!.next;
      removeNode!.next = null;

      this._listLength--;

      return removeNode!.value;
    }
  }

  public removeAll(element: number): void {
    for (let i = this.length() - 1; i >= 0; i--) {
      if (this.get(i)!.value === element) this.remove(i);
    }
  }

  public get(index: number): ListNode | null {
    if (this._listLength === 0 || index > this._listLength - 1 || index < 0) {
      throw Error(`Can't get element with index ${index}`);
    } else {
      let returnNode: ListNode | null = this._head;
      for (let i = 1; i <= index; i++) {
        returnNode = returnNode!.next;
      }

      return returnNode;
    }
  }

  public clone(): SinglyLinkedList | null {
    let newList: SinglyLinkedList | null = new SinglyLinkedList();
    for (let i = 0; i < this.length(); i++) {
      newList!.append(this.get(i)!.value);
    }
    return newList;
  }

  public reverse() {
    let currentNode = this._head;
    this._head = this._tail;
    this._tail = currentNode;

    let prevNode: ListNode | null = null;
    let nextNode: ListNode | null;

    for(let i = 0; i < this._listLength; i++) {
      nextNode = currentNode!.next;
      currentNode!.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }
  }

  public findFirst(element: number): number {
    let current: ListNode | null = this._head;
    let currentPosition: number = 0;
    while(current) {
      if(current.value === element) {
        return currentPosition;
      }
      currentPosition++;
      current = current.next;
    }
    return -1;
  }

  public findLast(element: number): number {
    let current: ListNode | null = this._head;
    let currentPosition: number = 0;
    let res: number = 0;
    while(current) {
      if(current.value === element) {
        res = currentPosition;
      }
      currentPosition++;
      current = current.next;
    }

    if(res) return res;
    else return -1;
  }

  public clear() {
    this._head = null;
    this._tail = null;
    this.listLength = 0;
  }

  public extend(list: SinglyLinkedList): void {
    for (let i = 0; i < list.length(); i++) {
      this.append(list.get(i)!.value);
    }
  }

  private shift(): number {
    if (this._listLength === 0) {
      throw Error('List is empty');
    } else if (this._head === this._tail) {
      const returnNode = this._head;
      this._head = null;
      this._tail = null;
      this._listLength = 0;

      return returnNode!.value;
    } else {
      const prevHeadNode = this._head;
      this._head = prevHeadNode!.next;
      prevHeadNode!.next = null;
      this._listLength--;

      return prevHeadNode!.value;
    }
  }

  private pop(): number {
    if (this._listLength === 0) {
      throw Error('List is empty');
    } else if (this._head === this._tail) {
      const returnNode: ListNode | null = this._head;
      this._head = null;
      this._tail = null;
      this._listLength = 0;

      return returnNode!.value;
    } else {
      let returnNode: ListNode | null;
      let newTailNode: ListNode | null = null;
      let currentNode = this._head;

      while (currentNode!.next) {
        newTailNode = currentNode;
        currentNode = currentNode!.next;
      }

      returnNode = this._tail;
      newTailNode!.next = null;
      this._tail = newTailNode;
      this._listLength--;

      return returnNode!.value;
    }
  }
}