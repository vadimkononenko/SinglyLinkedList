"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinglyLinkedList = void 0;
class ListNode {
    constructor(nodeValue) {
        this._value = nodeValue;
        this._next = null;
    }
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v;
    }
    get next() {
        return this._next;
    }
    set next(v) {
        this._next = v;
    }
}
class SinglyLinkedList {
    constructor() {
        this._listLength = 0;
        this._head = null;
        this._tail = null;
    }
    get head() {
        return this._head;
    }
    set head(node) {
        this._head = node;
    }
    get tail() {
        return this._tail;
    }
    set tail(node) {
        this._tail = node;
    }
    get listLength() {
        return this._listLength;
    }
    set listLength(v) {
        this._listLength = v;
    }
    length() {
        return this._listLength;
    }
    append(element) {
        let newNode = new ListNode(element);
        if (this._head === null) {
            this._head = newNode;
            this._tail = this._head;
        }
        else {
            this._tail.next = newNode;
            this._tail = newNode;
        }
        this._listLength++;
    }
    insert(element, index) {
        let node = this.get(index);
        if (node) {
            node.value = element;
        }
    }
    remove(index) {
        if (index < 0 || index > this._listLength - 1) {
            throw Error(`Can't get element with index ${index}`);
        }
        else if (index === 0) {
            return this.shift();
        }
        else if (index === this._listLength - 1) {
            return this.pop();
        }
        else {
            const prevNode = this.get(index - 1);
            const removeNode = prevNode.next;
            prevNode.next = removeNode.next;
            removeNode.next = null;
            this._listLength--;
            return removeNode.value;
        }
    }
    removeAll(element) {
        for (let i = this.length() - 1; i >= 0; i--) {
            if (this.get(i).value === element)
                this.remove(i);
        }
    }
    get(index) {
        if (this._listLength === 0 || index > this._listLength - 1 || index < 0) {
            throw Error(`Can't get element with index ${index}`);
        }
        else {
            let returnNode = this._head;
            for (let i = 1; i <= index; i++) {
                returnNode = returnNode.next;
            }
            return returnNode;
        }
    }
    clone() {
        let newList = new SinglyLinkedList();
        for (let i = 0; i < this.length(); i++) {
            newList.append(this.get(i).value);
        }
        return newList;
    }
    reverse() {
        let currentNode = this._head;
        this._head = this._tail;
        this._tail = currentNode;
        let prevNode = null;
        let nextNode;
        for (let i = 0; i < this._listLength; i++) {
            nextNode = currentNode.next;
            currentNode.next = prevNode;
            prevNode = currentNode;
            currentNode = nextNode;
        }
    }
    findFirst(element) {
        let current = this._head;
        let currentPosition = 0;
        while (current) {
            if (current.value === element) {
                return currentPosition;
            }
            currentPosition++;
            current = current.next;
        }
        return -1;
    }
    findLast(element) {
        let current = this._head;
        let currentPosition = 0;
        let res = 0;
        while (current) {
            if (current.value === element) {
                res = currentPosition;
            }
            currentPosition++;
            current = current.next;
        }
        if (res)
            return res;
        else
            return -1;
    }
    clear() {
        this._head = null;
        this._tail = null;
        this.listLength = 0;
    }
    extend(list) {
        // for (let i = 0; i < list.length(); i++) {
        //   this.append(list.get(i)!.value);
        // }
        const newList = list;
        [this._tail.next, this.tail] = [
            newList._head,
            newList._tail,
        ];
    }
    shift() {
        if (this._listLength === 0) {
            throw Error('List is empty');
        }
        else if (this._head === this._tail) {
            const returnNode = this._head;
            this._head = null;
            this._tail = null;
            this._listLength = 0;
            return returnNode.value;
        }
        else {
            const prevHeadNode = this._head;
            this._head = prevHeadNode.next;
            prevHeadNode.next = null;
            this._listLength--;
            return prevHeadNode.value;
        }
    }
    pop() {
        if (this._listLength === 0) {
            throw Error('List is empty');
        }
        else if (this._head === this._tail) {
            const returnNode = this._head;
            this._head = null;
            this._tail = null;
            this._listLength = 0;
            return returnNode.value;
        }
        else {
            let returnNode;
            let newTailNode = null;
            let currentNode = this._head;
            while (currentNode.next) {
                newTailNode = currentNode;
                currentNode = currentNode.next;
            }
            returnNode = this._tail;
            newTailNode.next = null;
            this._tail = newTailNode;
            this._listLength--;
            return returnNode.value;
        }
    }
}
exports.SinglyLinkedList = SinglyLinkedList;
let list1 = new SinglyLinkedList();
let list2 = new SinglyLinkedList();
list1.append(1);
list1.append(2);
list1.append(3);
list2.append(4);
list2.append(5);
list2.append(6);
list1.extend(list2);
for (let i = 0; i < list1.length(); i++) {
    console.log((_a = list1.get(i)) === null || _a === void 0 ? void 0 : _a.value);
}
console.log(list1.length());
list2.append(5324);
console.log(list1.length());
