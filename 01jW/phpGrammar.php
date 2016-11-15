<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<?php
	// php鍙橀噺鐨勫０鏄�
	// 瀛楃涓�
	$str = '浣犲ソ涓栫晫';
	echo $str;
	// 鍙橀噺鐨勫懡鍚�
	// 瀛楁瘝鏁板瓧涓嬪垝绾�,鏁板瓧涓嶆墦澶�
	$str1 = 'str1';
	$_str1 = '_str1';
	// 鎸囧畾缂栫爜闆�
	header('Content-Type:text/html;charset=utf-8');
	//鏁版嵁绫诲瀷
	//瀛楃涓� 鏁板�� 甯冨皵鍊� 鏁扮粍 瀵硅薄 null
	$str2 = '瀛楃涓�';
	$str2 = "瀛楃涓�";//鍗曞紩鍙峰拰鍙屽紩鍙烽兘鍙互
	echo $str2;
	//鏁板瓧
	$num = 10;
	$float = 10.5;
	echo $num;
	echo $float;
	//甯冨皵鍊�
	$boolean = false;
	$boolean2 = true;
	echo $boolean;//椤甸潰涓嶆墦鍗颁换浣曚笢瑗�
	echo $boolean2;//杩斿洖1
	//鏁扮粍
	$arr = array(1,2,3);
	$arr2 = array($arr,2,3);//浜岀淮绱犵粍
	$arr3 = array('name' => '寮犱笁' , 'age' => 24);////鍏宠仈鏁扮粍
	print_r($arr);
	print_r($arr2);
	print_r($arr3);//print_r鎵撳嵃鏁扮粍缁撴瀯
	//瀵硅薄
	//瀵规瘮js:var obj = {name:'zhangsan',age:10}
	//obj.name 
	//obj['name']
	$arr4 = array('name' => 'zhangsan', 'age'=>11);
	echo $arr4['name'];
	echo $arr4['age'];
	//null
	$a=null;
	echo 'a='.$a;//椤甸潰涓嶆墦鍗颁换浣曚笢瑗�
	//================================
	//澹版槑涓�涓被
	class Person {
		public $name = "lisi";
		public $age = 10;
	}
	//瀹炰緥鍖�
	$person = new Person;
	var_dump($person);
	//================================
	// echo 杈撳嚭绠�鍗曠被鍨�
	// print_r(); 鐢ㄦ潵杈撳嚭鏁扮粍缁撴瀯
	// var_dump(); 鐢ㄦ潵杈撳彉閲忚缁嗕俊鎭�
	//================================
	// php閲岄潰瀛楃涓茬殑鎷兼帴涓嶈兘鐢�"+"鍙�,"+"鍙峰彧鑳藉仛绠楁湳杩愮畻,php鐢�"."鍋氬瓧绗︿覆鐨勬嫾鎺�
	$num1 = 10;
	$num2 = 5;
	echo $num1+$num2;
	echo $num1.$num2;
	//================================
	// 鍑芥暟,鍙互鎸囧畾鍙傛暟鐨勯粯璁ゅ��
	function sayHi($name="zhangsan"){
		echo "浣犲ソ".$name;
	}
	sayHi();
	//================================
	//鍒嗘敮璇彞
	$num = 16;
	if($num <= 16){
		echo '骞寸骇澶皬';
	}
	//寰幆璇彞
	$arr5 = array(1,2);
	//鑾峰彇鏁扮粍闀垮害
	$len = count($arr5);
	//寰幆璇彞
	for ($i=0; $i < $len; $i++) { 
		echo($arr5[$i]);
	}
	//寰幆璇彞
	$arr6 = array('浣�','濂�');
	//寰幆璇彞
	foreach ($arr6 as $key => $value) {
		echo $arr6[$key];
	}
	//涔熷彲浠ュ惊鐜储寮曠礌缁�
	foreach ($arr5 as $key => $value) {
		echo $arr5[$key];
	}
	//=================================
	//鍔ㄦ�佸姞杞介〉闈�
	echo '<h1>hello wolrd</h1>';
	echo '<a href="http://www.baidu.com">鍘荤櫨搴�</a>';
	//鍔ㄦ�佸姞杞藉垪琛�
	?>
	<ul>
		<?php
			foreach($arr as $key=>$val) {
		?>
		
			<li><?php echo $val; ?></li>

		<?php
			}
		?>
	</ul>
</body>
</html>
