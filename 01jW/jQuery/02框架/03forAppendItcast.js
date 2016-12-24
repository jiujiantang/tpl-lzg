(function ( window, undefined ) {


var arr = [],
    push = arr.push,
    slice = arr.slice;

function itcast ( html ) {

	return new itcast.fn.init( html );

}

itcast.fn = itcast.prototype = {

	constructor: itcast,

	length: 0,

    selector: '',   // 表示使用了选择器

    type: 'itcast',

	init: function ( html ) {
		// [].push.apply( this, parseHTML( html ) );

		if ( html == null || html === '' ) {
			// 结束
			return; // this
		}


		if ( typeof html === 'function' ) {

		}

		if ( itcast.isString( html ) ) {
            // 创建dom元素
			if ( /^</.test( html ) ) {
				push.apply( this, parseHTML( html ) );
             // push.apply( this, itcast.fn.parseHTML( html ) );
			} else {
				// 调用选择器模块,
				push.apply( this, itcast.select( html ) );
                // selector被赋值
                this.selector = html;
			}

		}


    if ( html && html.type === 'itcast' ) {
      // 是一个 itcast 对象
      // 将传入的 itcast 对象所有的元素都加到 this 中
      push.apply( this, html );
      this.selector = html.selector;
    }

    // 判断是不是一个 DOM 对象 
    if ( html.nodeType ) {
      // 是 DOM 对象
      this[ 0 ] = html;
    }

	},

  toArray: function () {
    // var res = [];
    // for ( var i = 0; i < this.length; i++ ) {
    //   res.push( this[ i ] );
    // }
    // return res;
    // 数组的slice方法,从第0个开始截取,没有兼容问题
    return slice.call( this, 0 );    
  },
  // get一个dom元素
  get: function ( index ) {
    if ( index === undefined ) {
      return this.toArray();
    }
    return this[ index ];
  },
  // 返回的是一个itcast对象
  eq: function ( num ) {
    var dom;
    if ( num >= 0 ) {
      dom = this.get( num );
    } else {
      dom = this.get( this.length + num );
    }
    return this.constructor( dom );
  },
  // 静态方法里面可以直接调用,同时实例方法里面也可以调用
  each: function ( func ) {
    // 将 this 中的每一个 DOM 元素遍历一下
    return itcast.each( this, func );
  },
  map: function ( func ) {
    return itcast.map( this, func );
  } 
};

itcast.fn.init.prototype = itcast.fn;


// 添加可扩展的方法 extend
itcast.extend = itcast.fn.extend = function ( obj ) {
  for ( var k in obj ) {
    this[ k ] = obj[ k ];
  }
};







// select 引擎专门用于搜素元素
var select = 

(function () {


var push = [].push;

// 如果出现了错误那么就需要重写 push
try {
  var div = document.createElement( 'div' );
  div.innerHTML = '<p></p>';
  var arr = [];
  push.apply( arr, div.getElementsByTagName( 'p' ));
} catch ( e ) {

  push = {
    apply: function ( array1, array2 ) {
      for ( var i = 0; i < array2.length; i++ ) {
        array1[ array1.length++ ] = array2[ i ]; 
      }
    }
  };
}



// 正则表达式
var rnative = /\{\s*\[native/;
var rtrim = /^\s+|\s+$/g;
//                          1           2         3     4
var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;






// 基本函数, support 对象, 验证 qsa 与 byclass
var support = {};

support.qsa = rnative.test( document.querySelectorAll + '' );
support.getElementsByClassName = 
	rnative.test( document.getElementsByClassName + '' );
support.trim = rnative.test( String.prototype.trim + '' );
support.indexOf = rnative.test( Array.prototype.indexOf + '' );






// 基本方法
function getByClassName ( className, node ) {
  node = node || document;
  var allElem, res = [], i;

  if ( support.getElementsByClassName ) {
    return node.getElementsByClassName( className );
  } else {
    allElem = node.getElementsByTagName( '*' );
    for ( i = 0; i < allElem.length; i++ ) {
      if ( allElem[ i ].className === className ) {
        res.push( allElem[ i ] );
      }
    }
    return res;
  }
}

// 自定义实现 trim 方法
var myTrim = function ( str ) {
	// 表示两端去空格, 然后返回去除空格的结果
	if ( support.trim ) {
		return str.trim();
	} else {
		// 自定义实现
		return str.replace( rtrim, '' );
	}
}

var myIndexOf = function ( array, search, startIndex ) {
  startIndex = startIndex || 0;
  if ( support.indexOf ) {
    return array.indexOf( search, startIndex );
  } else {
    for ( var i = startIndex; i < array.length; i++ ) {
      if ( array[ i ] === search ) {
        return i;
      }
    }
    return -1;
  }
}


var unique = function ( array ) {
  var resArray = [], i = 0;
  for ( ; i < array.length; i++ ) {
    if ( myIndexOf( resArray, array[ i ] ) == -1 ) {
      resArray.push( array[ i ] );
    }
  }
  return resArray;
} 


function basicSelect ( selector, node ) {
  node = node || document;
  var m, res;
  if ( m = rbaseselector.exec( selector ) ) {
    if ( m[ 1 ] ) { // id
      res = document.getElementById( m[ 1 ] );
      if ( res ) {
        return [ res ];
      } else {
        return [];
      }
    } else if ( m[ 2 ] ) {  // class
      // return node.getElementsByClassName( m[ 2 ] );
      return getByClassName( m[ 2 ], node );
    } else if ( m[ 3 ] ) {
      return node.getElementsByTagName( m[ 3 ] );
    } else if ( m[ 4 ] ) {
      return node.getElementsByTagName( m[ 4 ] );
    }
  }
  return [];
}


function select2 ( selector, results ) {

  results = results || [];

  var selectors = selector.split( ' ' );

  // 假定 'div p .c'

  var arr = [], node = [ document ];


  for ( var j = 0; j < selectors.length; j++ ) {
    for ( var i = 0; i < node.length; i++ ) {
      push.apply( arr, basicSelect( selectors[ j ], node[ i ] ));
    } 
    node = arr;
    arr = [];
  }

  push.apply( results, node );
  return results;

}

function select ( selector, results ) {
	results = results || [];
  var m, temp, selectors, i, subselector;
	
  if ( typeof selector != 'string' ) return results;

  // 表明参数都没有问题, 接下来就是如何选择
  // 首先判断 qsa 是否可用
  // 然后再 一步步的 自己实现
  if ( support.qsa ) {
    push.apply( results, document.querySelectorAll( selector ) );
  } else {
    // 不存在再来考虑自己实现
    selectors = selector.split( ',' );
    // 循环
    for ( i = 0; i < selectors.length; i++ ) {
      subselector = myTrim( selectors[ i ] );
      // 接下来就是 处理 subselector
      if ( rbaseselector.test( subselector ) ) {
        // 基本选择器
        push.apply( results, basicSelect( subselector ) );
      } else {
        // select2 函数
        select2( subselector, results );
      }
    }
  }
  // 返回 result
  return unique( results );
}


return select;
})();

itcast.select = select;   // 在需要的时候 可以使用第三方的 选择器引擎



// 需要一些判断的方法
itcast.extend({
  isString: function ( data ) {
    return typeof data === 'string';
  }

});


// DOM 操作的方法
// 将字符串转换为 DOM 对象的函数
var parseHTML = (function () {
	var div = document.createElement( 'div' );
	function parseHTML ( html ) {
		div.innerHTML = html;
		var res = [];
		for ( var i = 0; i < div.childNodes.length; i++ ) {
			res.push( div.childNodes[ i ] );
		}
		div.innerHTML = '';
		return res;
	}
	return parseHTML;
})();




// 添加 each 与 map 功能, 给 itcast 构造函数添加静态方法
itcast.extend({

  each: function ( arr, func ) {
    var i;
    // 在 ES5 中还引入了 Array.isArray 的方法专门来判断数组
    // 数组和伪数组都可以被处理
    if ( arr instanceof Array || arr.length >= 0) {
      for ( i = 0; i < arr.length; i++ ) {
        // i是键,arr[i]是值,使用场景如下
        //each( list, function ( i, v ) {
        //  this.style.border = '1px solid red';
        //})
        func.call( arr[ i ], i, arr[ i ] );
      }
    } else {
      // 如果传进来的是一个对象,就用forin循环遍历
      for ( i in arr ) {
        func.call( arr[ i ], i, arr[ i ] );
      }
    }
    return arr;
  },
  // 使用场景如下:
  // var list = map( [ 1, 2, 3, 4, 5 ], function ( v, i ) {
  //    return i+'a'+v;
  // });
  // 返回->[0a1,1a2,2a3,3a4,4a5]
  // 将函数的结果封装到数组里面返回
  map: function ( arr, func ) {
    var i, res = [], tmp;
    if ( arr instanceof Array || arr.length >= 0 ) {
      for ( i = 0; i < arr.length; i++ ) {
        tmp = func( arr[ i ], i );
        if ( tmp != null ) {
          res.push( tmp );
        }
      }
    } else {
      for ( i in arr ){
        tmp = func( arr[ i ], i );
        if ( tmp != null ) {
          res.push( tmp );
        }
      }
    }
    return res;
  } 
});



// DOM 操作
// 工具方法
itcast.extend({
  prependChild: function ( parent, element ) {
    parent.insertBefore( element, parent.firstChild );
  }
});


// DOM 方法
itcast.fn.extend({
  appendTo: function ( selector ) {
    var iObj = this.constructor( selector );
    var newObj = this.constructor();
    for ( var i = 0; i < this.length; i++ ) {
      for ( var j = 0; j < iObj.length; j++ ) {
        var temp = 
              j == iObj.length - 1
              ? this[ i ] 
              : this[ i ].cloneNode( true );

        [].push.call( newObj, temp );
        iObj[ j ].appendChild( temp );
      }
    }
    return newObj;
  },
  append: function ( selector ) {

    this.constructor( selector ).appendTo( this );

    return this;
  },
  prependTo: function ( selector ) {
    var iObj = this.constructor( selector );
    var newObj = this.constructor();
    for ( var i = 0; i < this.length; i++ ) {
      for ( var j = 0; j < iObj.length; j++ ) {
        var temp = 
            i == this.length - 1 && j == iObj.length - 1 
              ? this[ i ] 
              : this[ i ].cloneNode( true );

        [].push.call( newObj, temp );
        // iObj[ j ].appendChild( temp );
        // 获取父节点中的第一个节点
        var firstChild = iObj[ j].firstChild;
        // 往父节点中添加一个temp元素,他要添加在firstChild元素之前
        iObj[ j].insertBefore(temp,firstChild);
      }
    }
    return newObj;
  },
  prepend: function ( selector ) {
    this.constructor( selector ).prependTo( this );
    return this;
  }
});


















window.itcast = window.I = itcast;



})( window )



















