var selector = (function(){
    // 基本函数, support 对象, 验证 qsa 与 byclass
    var support = {};
    var rnative = /\{\s*\[native/;

    support.qsa = rnative.test( document.querySelectorAll + '' );
    support.getElementsByClassName =
        rnative.test( document.getElementsByClassName + '' );

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


    //                          1           2         3     4
    var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;

    function select ( selector, results ) {
        results = results || [];
        var m, temp;

        if ( typeof selector != 'string' ) return results;

        m = rbaseselector.exec( selector );

        if ( m ) {
            // 捕获到数据了
            if ( m[ 1 ] &&
                ( temp = document.getElementById( m[ 1 ] ) ) ) {
                results.push( temp );
            } else if ( m[ 2 ] ) {
                results.push.apply( results, getByClassName( m[ 2 ] ) );
            } else if ( m[ 3 ] ) {
                results.push.apply( results, document.getElementsByTagName( m[ 3 ] ) ); // selector
            } else if ( m[ 4 ] ) {
                results.push.apply( results, document.getElementsByTagName( m[ 4 ] ) ); // selector
            }
            // 注意: 3 和 4 是可以合并
        }


        return results;
    }
    return select;
})();