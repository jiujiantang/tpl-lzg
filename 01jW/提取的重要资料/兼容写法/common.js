/**
 * Created by jf on 2016/8/16.
 */
/**
 * 获取元素文本内容的兼容写法
 * @param element
 * @returns {string}
 */
function getInnerText(element) {
    if (typeof element.innerText == "string") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}

/**
 * 设置元素文本内容的兼容写法
 * @param element
 * @param content
 */
function setInnerText(element, content) {
    if (typeof element.innerText == "string") {
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}
/**
 * 获取下一个兄弟元素的兼容写法
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;//下一个兄弟节点
        while (next && 1 !== next.nodeType) {//1有 2不是我们想要的
            next = next.nextSibling;
        }
        return next;
    }
}
/**
 * 获取上一个兄弟元素的兼容写法
 * @param element
 * @returns {*}
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var perv = element.previousSibling;//上一个兄弟节点
        while (perv && 1 !== perv.nodeType) {//1有 2不是我们想要的
            perv = perv.previousSibling;
        }
        return perv;
    }
}

/**
 * 获取元素的第一个子元素兼容写法
 * @param element
 * @returns {*}
 */
function getFirstChild(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var first = element.firstChild;//第一个子节点
        while (first && 1 !== first.nodeType) {//1有 2不是我们想要的
            first = first.nextSibling;
        }
        return first;
    }
}
/**
 * 获取元素的最后一个子元素的兼容写法
 * @param element
 * @returns {*}
 */

function getLastChild(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var last = element.lastChild;//最后一个子节点
        while (last && 1 !== last.nodeType) {//1有 2不是我们想要的
            last = last.previousSibling;
        }
        return last;
    }
}


//通过currentStyle与getComputedStyle()兼容写法获取外联内联样式
//能获取但是不能修改内联外联样式，只能通过行内样式style属性去修改
/**
 * 获取内联外联样式  返回的是一个对象  如obj.width就能获取宽度
 * @param element
 * @returns {*}
 */
function getStyle(element) {
    if (element.currentStyle) {
        return element.currentStyle;
    } else {
        return getComputedStyle(element);
    }
}

/**
 * 通过className类名获取元素的兼容方法
 * @param element
 * @param className
 * @returns {*}
 */
function  getElementsByClassName(element,className){
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className);
    }else{
        var children = (element || document).getElementsByTagName('*');
        var elements = [];
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    }
}