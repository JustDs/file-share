
/**
 * 主程序入口
 */

var express = require('express');
var path = require('path');
var util = require('util');

var config = require('./config');


(function (logError) {

	// 应用初始化

	var app = express();


	// 参数配置

	app.set('port', config.server.port || 3000);
	app.set('static', path.join(__dirname, 'static'));
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');


	// 调试模式错误输出

	if ('development' === app.get('env')) {

		app.use(require('errorhandler')());
	}


	// 路径映射与中间件

	app.use(require('morgan')('dev'));
	app.use(require('body-parser').json());
	app.use(require('method-override')());
	app.use(express.static(app.get('static')));


	// 启动应用

	app.listen(app.get('port'), function () {

		console.log('FileShare 正在监听端口 ' + app.get('port'));
	});


})(function (err) {

	// 错误日志输出

	console.error('\n');
	
	while (err) {

		var message = '错误 ' + err.code + ': ' + err.message + '\n';

		for (var item in err.details) {

			message += item + ': ' + util.inspect(err.details[item], { depth: null }) + '\n';
		}

		(err.fatal ? console.error : console.warn)(message);

		err = err.prevErr;
	}
});