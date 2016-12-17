// �ṩ�ӿ�
var select =(function(){
    ////////////////////////////������ʽ////////////////////////////
    // * ����ǰ���һ���ַ���һ���ַ����� 0 �ε����
    // \s �հ��ַ�, �����ո�, tab, �س����е�
    // ->ƥ��"    [native"
    var rnative = /\{\s*\[native/;
    // ^: ������ xxx ��ͷ
    // $: ������ xxx ��β
    // g: ���η�����ִ��ȫ��ƥ�䣨��������ƥ��������ҵ���һ��ƥ���ֹͣ��
    // -> ƥ�������пո���ַ���
    var rtrim = /^\s+|\s+$/g;
    // ?: ���鵫������
    // () ���ڷ���
    var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;
    ///////////////////////////��������//////////////////////////////
    // support: ������֤����
    var support = {};
    // ��֤querySelectorAll�Ƿ����
    // �����ڵ�ǰ�������������õķ�����������ַ���" { [native code] }"
    // �����Բ�ͬ�����������ͬ���ֵķ����ǲ���Ӱ���
    support.qsa = rnative.test( document.querySelectorAll + '');
    support.getElementsByClassName = rnative.test(document.getElementsByClassName+"");
    support.trim = rnative.test(String.prototype.trim + "");
    support.indexOf = rnative.test(Array.prototype.indexOf + "");
    ///////////////////////////��Ŀ��������//////////////////////////////
    // û�м��������getElementsByClassName ����
    function getByClassName (className, node ) {
        // ? ҵ���߼�
        node = node || document;
        // allElem����ʱ����,res�Ƿ�������,i�ǹ��߱���
        var allElem, res = [],i;
        // ������
        if (support.getElementsByClassName(className)){
            // ͨ��
            return node.getElementsByClassName();
        } else {
            // getElementsByTagNameû�м�������
            allElem = node.getElementsByTagName("*");
            for(i=0 ;i<allElem.length; i++){
               if( allElem[i].className === className){
                   // �������push����pushһ��Ԫ��,Ҳ����pushһ������
                   res.push(allElem[i]);
               }
            }
            return res;
        }
    }
    // û�м��������trim����
    // trim ȥ���ַ������˵Ŀո�
    var  myTrim = function() {
        // ������
        if ( support.trim) {
            return str.trim();
        } else {
            // ����: rtrim����ո�
            // ����: ����
            //��rtrimǰ�涨�������
            return str.replace(rtrim,'');
        }
    }
    // �Զ���indexOf����
    var myIndexOf = function(array, search, startIndex ){
        // ����: var startIndex ...��startIndex ��Ч����һ����
        var startIndex = startIndex || 0;
        var i;
        // ������
        if ( support.indexOf){
            return array.indexOf(search,startIndex);
        }else {
            for (i = startIndex; i < array.length; i++) {
                // ѭ����ȡ��ͬ��Ԫ��
                if (array[i] === search) {
                    return i;
                }
            }
            return -1;
        }
    }
    // ȥ�صķ���
    var unique = function(array){
        var resArray = [], i=0;
        // ������������д���Ǳ������
        // ����: ͨ��
        for (; i< array.length; i++){
            // ͨ���Զ���indexOf����������Ƿ�����ͬ��Ԫ��,resArray������,array�Ǳ����Ե�Ԫ��
            if (myIndexOf(resArray, array[i]) == -1) {
                resArray.push(array[i]);
            }
        }
        return resArray;
    }
    // ������ѡ����
    function basicSlecter (selector,node){
        // ���û�д���domԪ��,��Ĭ��ΪdocumentԪ��
        node = node || document;
        var m,res;
        // rbaseselector�����ڼ�����ѡ������������ʽ
        // ����?:ծ����û������ ����:ͨ�� �ܽ�: Ҳ���õĳ�������
        if ( m = rbaseselector.exec(selector)){
            if(m[1]){ // id,getElementByIdû�м�������
                res = document.getElementById(m[1]);
                if (res) {
                    // ����: ��������һ������ ����: ���һ������ �ܽ�: ����׷��ݵ�����
                    return [res];
                }else  {
                    return [];
                }
            }else if( m[2]){ // class
                return getByClassName(m[2],node );
            }else if (m[3]){ // getElementsByTagNameû�м�������,����ȫ��Ԫ��
                return node.getElementsByTagName( m[3]);
            }else if (m[4]){ // ��ǩѡ����
                return node.getElementsByTagName( m[4]);
            }
        }
        return [];
    }
    // ���ѡ����
    function slect2 (selector,results){
        results = results || [];
        // ��ؼ���һ��,��������
        var selectors = selector.split(' ');
        // arr����ʱ����,node�ǽ������,�����ǳ�ʼ��
        var arr = [],node = [document];
        // ���ѭ��ÿ�ζ��ṩһ����ǩ������,"div p span"->div,�Դ�����
        for ( var j=0; j<selectors.length; j++) {
            for (var i =0;i<node.length; i++) {
                // �ڲ��ǩ����node��Χ�ڵ�����ṩ�ļ�����ǩ
                arr.push.apply(arr,basicSlecter(selectors[j],node[i]));
            }
            // node�׶α���������
            node = arr;
            // ������ʱ����
            arr = [];
        }
        // �������ս��
        results.push.apply(results, node);
        return results;
    }
    ///////////////////////////����///////////////////////////
    function select (selector, results ) {
        // Ϊ����ʽ
        results = results || [];
        var m, temp, selectors, i, subselector;
        // �������
        if ( typeof selector != 'string') return results;
        // ͨ�����.���querySelectorAll�ܲ���ʹ��
        if ( support.qsa) {
            results.push.apply(results,document.querySelectorAll(selector));
        } else  {
            // �Լ�ʵ��querySelectorAll
            for ( i=0; i <selectors.length; i++) {
                // �ü���ie678�ķ�����ȥ�����˵Ŀո�
                subselector = myTrim(selector[i]);
                // ͨ���������ַ���ʵ�� ����ѡ���� ��Ԫ�صļ���
                if (rbaseselector.test(subselector)) {
                    // ƥ��ͨ��,basicSelect���з�����ȡ
                    results.push.apply(results,basicSlecter(subselector));
                }else {
                    // ���ѡ����
                    select2(subselector,results);
                }

            }
        }
        // ����ȥ�غ�Ľ������
        return unique(results);
    }
    // �ṩ�ӿ�
    return select;
})();