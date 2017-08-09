import React from 'react'
import ReactDom from 'react-dom'
import fetchs from '../../components/fetchs'// 异步数据
import BD from '../../components/BaseData'
import CropperWin from '../../components/CropperWin'
import AlbumSelect from '../../components/AlbumSelect'
// import mOxie from 'mOxie'

import { is } from 'immutable'

class ImageDialog extends React.Component {
// class ImageDialogOrigin extends React.Component {
    constructor(props) {
        super(props)
        this.init = true;
        this.state = {
           imgList: new Array(5).fill(''), // 页面中已有图片的列表
					 uploadList: [''],// 弹框可以上传的列表
					 insert: true, // 当前的操作是插入图片
					//  show: false
					// albumList: {},// 选择相册的列表数据
					albumId: '',// 选择的相册id
					setMark: false, //设置水印
					tab: 0, // 添加图片的来源, 0  我的电脑, 1  url
					url: '', // 网上图片的url
					tmpImg: [], // 在离开前保存上传的图片，插入或关闭后，清空
					cropperUrl: '',
					showCrop: false,
        }
    }
    componentDidMount () {
			window.onresize = () => {
				this.setBtnStyleFun();
			}
			/*------------------ 兼容ie9 可行 ------------------*/ 
			// console.log(mOxie)
			let $this = this;
			this.fileInput = new mOxie.FileInput({
				browse_button: 'file-picker', // or document.getElementById('file-picker')
				constainer: 'file-container',
				accept: [
					{title: 'Images', extensions: 'jpg,png,jpeg'} // accept only images
				],
				runtime_order: 'html5,flash',
			});
			this.fileInput.onchange = async function(e) {
				const { uploadList, albumId } = $this.state;
				$this.setState({tmpImg: uploadList.concat()});
				$this.props.setMask({loading:true, msg: ''});
				// console.info(e.target.files); // or this.files or fileInput.files
				let file = e.target.files[0];
				if(file) {// 如果不判断，取消的时候回报错
					if(file.size > 1024 * 1024 * 3) {
						// alert('图片大小不能超过 5MB!');
						$this.props.setMask({loading:false, msg: '图片大小不能超过 3MB!'});
						return ;
					}
					// 验证图片格式
					switch(file.type) { // jpg会识别为jpeg
						case 'image/png':
						case 'image/jpg': 
						case 'image/jpeg':break;
						// case 'image/gif': 
						default:
								$this.props.setMask({loading:false, msg: '图片格式必须为jpg、jpeg、png!'});
								// $this.props.setMask({loading:false, msg: '图片格式必须为jpg、jpeg、png、gif!'});
								return;
					}
					let arr = uploadList.concat();
					let index = arr.indexOf('');
					arr[index] = {};
					arr[index].warn = (file.size <　750*750);

					// flash用base64上传， html5用formdata上传
					let type = file.ruid.substr(0, 5);
					console.log(type);
					if(type == 'html5') {
							// formData 上传
							try{
								let formData = new FormData();
								formData.append(file.name, file.getSource());
								// console.log(albumId)
								formData.append('albumId', albumId);
								formData.append('zdid', BD.zdid);
								let result = await fetchs({url: `${BD.httpAl}/image/upload/file`, method:'post', body: formData})
								// console.log(result)
								$this.setImgUpload(result, arr, index);
							} catch(err) {
								console.log(err)
								$this.props.setMask({loading:false, msg: '网络错误'});
							}
					}else if(type == 'flash') {
						// 转为base64上传
						let fr = new mOxie.FileReader();
						fr.onload = async (e) => {
							try{
								// console.log(e.target.result, arr); // e.target.data   base64
								let baseString = e.target.data ? e.target.data : e.target.result;
								let result = await fetchs({url: `${BD.httpAl}/image/upload/base`, method:'post', body: JSON.stringify({imageBase:baseString, albumID: albumId}) })
								// console.log(result)
								$this.setImgUpload(result, arr, index);
							} catch(err) {
								console.log(err)
								$this.props.setMask({loading:false, msg: '网络错误'});
							}
						}
						fr.readAsDataURL(file); // 加载图片
					}else {
						$this.props.setMask({loading:false, msg: '上传失败'});
						return;
					}
				}
			};

			this.fileInput.init(); // initialize
			/*----------------------------------------------------------*/ 

    }
		componentWillReceiveProps(nextProps) {
      const { getImg, index, loading, desc_img, getShowTab, albumList } = nextProps;
      if(is(getShowTab, this.props.getShowTab)) {
        let insert = true;
        let arr = [];
        let tmpImg = this.state.tmpImg.concat();
        if(tmpImg.length > 0 && tmpImg.filter((val, i)=>{return val !== ''}).length !== 0) {
          arr = tmpImg;
        }else {
        // 如果当前项有图，则只显示当前一个格的图片， 当前的操作为修改图片
          if(getImg[index]) {
            if(loading) {
              arr=[''];
            }else {
              insert = false;
              arr = [getImg[index]];
            }
          }else {
            arr = getImg.filter((val, i) => {
                return val == ''
            })
          }
        }

        this.setState({imgList:getImg.concat(), uploadList: arr, insert:insert});
        this.setBtnStyleFun(arr.indexOf('') !== -1);
        if(getShowTab == 2 && desc_img.length == 0) this.props.setShowTab(0);
        
        if(this.init && Object.keys(albumList).length) { // 初始化时，默认选中第一个相册
          albumList.my[0] && albumList.my[0].id && this.setState({albumId: albumList.my[0].id});
          this.init = false;
        }
      }
		}
		// handleClick = (index, e) => {// 
		// 	e.stopPropagation();
		// }
		setImgUpload = (result, arr, index) => { // 插件上传成功后调用的方法
			if(result && result.isSuccess) {
				arr[index].src = BD.httpImg + '/' + result.data.url;
				arr[index].id = result.data.id;
				// arr[index].src = result.data.url;
				let img = new Image();
				img.src = arr[index].src;
				img.onload = () => {
					this.props.setMask({loading:false, msg: ''}); // 放在此处，出错时可能不会关闭loading
					arr[index].width = img.width;
					arr[index].height = img.height;
					// console.log(arr)
					this.setState({uploadList:arr, showCrop: false})
					this.setBtnStyleFun(arr.indexOf('') !== -1);
				}
				img.onerror = () => {
					this.props.setMask({loading:false, msg: '网络错误'});
				}
			}else if(result && !result.isSuccess){
				this.props.setMask({loading:false, msg: result.msg});
			}else {
				this.props.setMask({loading:false, msg: '网络错误'});
			}
		}
		handleHide = (e) => {// 隐藏上传图片弹框
			e.preventDefault();
			this.props.setShow(false)
			this.setState({tmpImg: []});
		}
		// handleUpload = async (e) => {
		// 	console.dir(e.target)
		// 	var formEl = document.getElementById('formId');
		// 	formEl.action = `${BD.httpAl}/image/upload/file`;
		// 	formEl.method = 'post';
		// 	formEl.submit();

		// 	// result = await fetchs({url: `${BD.httpAl}/image/upload/file`, method:'post', body: formData}, msg =>{ this.props.setMask({loading:false, msg: msg}); })// 通过
		// }
		componentDidUpdate() { // 每次重新渲染都会更新按钮位置
			this.setBtnStyleFun();
		}
		setBtnStyleFun = (canUse) => {
			let dialogEl = document.getElementById('sys-ibank'), left = 0, top = 0;
			if(dialogEl) {
				// console.log(dialogEl.offsetTop, dialogEl.offsetLeft)
				left = dialogEl.offsetLeft;
				top = dialogEl.offsetTop;
			}
			let fileContain = document.getElementById('file-container');
			if(fileContain) {
				fileContain.style.left = left + 264 + 'px';
				fileContain.style.top = top + 148 + 46 + 'px';
				// console.log(canUse)
				if(canUse !== undefined) {
					fileContain.style.background = canUse?'#f40':'#ddd';
					this.fileInput.disable(!canUse);
				}
			}
		}
		handleUpload = (e) => {// 图片上传的change事件, 现已用插件代替
		}
		uploadImg = async (file, arr, index, e, type = 0) => { // 通过二进制
		}
    handleDel = (index, e) => {// 删除某张图片
      // let tmp = this.state.tmpImg.concat();
      // console.log('del')
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();
			let arr = this.state.uploadList.concat();
      arr.splice(index, 1)
      // tmp.splice(index, 1)
      arr.push('');
      // tmp.push('');
      // console.log(arr)
      if(this.props.getShowTab == 2) {
			  this.setState({uploadList: arr, tmpImg: arr, cropperUrl: ''})
      }else {
			  this.setState({uploadList: arr, tmpImg: arr})
      }
			// this.setState({uploadList: arr, tmpImg: tmp})
			this.setBtnStyleFun(arr.indexOf('') !== -1);
    }
		handleAlbumSel = (e) => {// 选择相册的change事件
			this.setState({albumId: e.target.value}, ()=>{console.log(this.state.albumId)})
		}
		handleMark = (e) => {// 设置水印的change事件
			this.setState({setMark:e.target.checked})
		}
    handleChangeTab = (tab, e) => { // 图片来源的切换
      // console.log(this.state.uploadList)
      if(this.props.getShowTab !== tab) {
        this.setState({tmpImg: this.state.uploadList.concat()}, ()=>this.props.setShowTab(tab));
      }
      // this.setState({tab: tab});
      // console.log(tab);
		}
		handleInputUrl = (e) => { // url的输入框
			this.setState({url: e.target.value});
		}
		handleAddUrl = async (e) => { // url添加按钮
			this.setState({tmpImg: this.state.uploadList.concat()}); // 修复bug：出错时，会清空前面的已上传的图片
			this.props.setMask({loading:true, msg: ''});
			let arr = this.state.uploadList.concat();
			let index = arr.indexOf('');
			// 检验图片的格式大小??

			let result = await fetchs(
				{url: `${BD.httpAl}/image/upload/url`, method:'post', body: JSON.stringify({url: this.state.url})}, 
				msg =>{ this.props.setMask({loading:false, msg: msg}); }
			)// 通过FormData上传图片
			// this.props.setMask({loading:false, msg: ''});
			if(result && result.isSuccess) {
				let img = new Image();
				img.src = BD.httpImg + '/' + result.data.url;
				arr[index] = {src: img.src};
				// arr[index].src = result.data.url;
				img.onload = () => {
					// 通过字节流上传图片
					this.props.setMask({loading:false, msg: ''});
					arr[index].width = img.width;
					arr[index].height = img.height;
					this.setState({uploadList:arr})
					this.setBtnStyleFun(arr.indexOf('') !== -1);
				}
				img.onerror = () => {
					this.props.setMask({loading:false, msg: ''});
				}
			}else {
				// alert(result.msg)
				this.props.setMask({loading:false, msg: result.msg});
			}
		}
		handleDescImgClick = (src, index, e) => {
			this.setState({cropperUrl: src, showCrop: true});
		}
    handleSave = (e) => {// 插入图片按钮的点击事件
      debugger;
			let arr = this.state.imgList.concat();
      let upload = this.state.uploadList.concat();
			let index = 0;
			if(this.state.insert) {// 插入操作
				arr = arr.map((val, i) => {
					if(val == '') {
						val = upload[index];
						index++;
					}
					return val 
				})
			}else {// 修改操作
				index = this.props.index;// 点击的下标
				if(upload[0])
					arr[index] = Object.assign({}, upload[0]);//此时upload只有一个元素
				else
					arr[index] = '';//此时upload只有一个元素
      }
			this.setState({imgList: arr, tmpImg: []})
			this.props.setImg(arr)
			this.props.setShow(false)
			this.props.updateMoveSku(true); // 手动更新图片搬家中的sku图片
			arr.length <= 5 && this.props.imgType == 'main' && this.props.setImgMain(arr)
		}
		handleStopPropagate = (e) => {// 阻止冒泡
			e.stopPropagation();
		}
		setCropperUrl = (url) => {
			this.setState({cropperUrl: url});
		}
		uploadCropper = async (dataUrl) => {
			// 上传图片
			// console.log('upload url')
			this.props.setMask({loading:true, msg: ''});
			const { uploadList, albumId } = this.state;
			let arr = uploadList.concat();
			let index = arr.indexOf('');
			arr[index] = {};
			try{
				let result = await fetchs({url: `${BD.httpAl}/image/upload/base`, method:'post', body: JSON.stringify({imageBase:dataUrl, albumID: albumId}) })
				// console.log(result)
        this.setImgUpload(result, arr, index);
        this.setState({cropperUrl: ''});
        
			} catch(err) {
				console.log(err)
				this.props.setMask({loading:false, msg: '网络错误'});
			}
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(!is(nextProps, this.props) || !is(nextState, this.state)) 
        return true
      else
        return false
    }
    /*------------------- 拖拽 --------------------*/
    handleDelDown = (e) => { // 修复删除时可能会出现拖拽的bug
      // console.log('down del')
      e.stopPropagation();
    }
		handleDown = (index, e) => { // 鼠标按下
			e.preventDefault();
			// console.log('down ', index);
			this.drag = true;
			this.dragTag = index;
			let target = document.querySelectorAll('.image-item')[index];
			target && (target.style.borderColor = '#E6E5E3'); // #E6E5E3
		}
		handleUp = (e) => { // 鼠标放开
			this.drag = false;
			if(this.dragTag !== undefined && this.dragEnd !== -1) {
				// console.log('up ');
				let arr = this.state.uploadList.concat();
				/*------- 换位法 ------*/
				// let tag = arr[this.dragTag];
				// arr[this.dragTag] = arr[this.dragEnd];
				// arr[this.dragEnd] = tag;
				/*--------------------*/
				/*------- 插值法 ------*/
				let start = 0, end = 0, tmp = [];
				let tag = arr.slice(this.dragTag, this.dragTag + 1);
				if(this.dragTag < this.dragEnd) {
					start = this.dragTag;
					end = this.dragEnd;
					tmp = arr.slice(start + 1, end + 1).concat(tag);
				}else {
					start = this.dragEnd;
					end = this.dragTag;
					tmp = tag.concat(arr.slice(start, end));
				}
				arr.splice(start, end - start + 1, ...tmp); // 删除后的数组
				/*--------------------*/
				this.setState({uploadList: arr.concat()});
				// this.dragTag = index;
				let tarEnd = document.querySelectorAll('.image-item')[this.dragEnd];
				tarEnd && (tarEnd.style.borderColor = '#E6E5E3'); // #E6E5E3
			}
			let target = document.querySelectorAll('.image-item')[this.dragTag];
			let box = document.getElementById('sys-ibank');
			box.style.cursor = 'default';
			if(target) {
				target.style.left = 0 + 'px';
				target.style.top = 0 + 'px';
				target.style.opacity = 1;
				target.style.zIndex = 100;
			}
		}
		handleMove = (e) => { // 鼠标移动
			let index = this.dragTag;
			let target = document.querySelectorAll('.image-item')[index];
			let box = document.getElementById('sys-ibank');
			let p = {
				x: e.clientX - box.offsetLeft - 31 - index*75,
				y: e.clientY - box.offsetTop - 361 + 5,
			}
			// console.log('move ', index, this.drag, p);
			if(target && this.drag) {
				box.style.cursor = 'move';
				target.style.left = p.x + 'px';
				target.style.top = p.y + 'px';
				target.style.opacity = 0.5;
				target.style.zIndex = 10000;
			}
		}
		handleEnter = (index, e) => {// 鼠标移入
			// index !== this.dragTag && console.log('enter ', index);
			if(index !== this.dragTag) {
				this.dragEnd = index;
				if(this.drag) {
					let tarEnd = document.querySelectorAll('.image-item')[index];
					tarEnd.style.borderColor = '#f40'; // #E6E5E3
				}
			}
		}
		handelLeave = (index, e) => {// 鼠标移出
			// index !== this.dragTag && console.log('leave ', index);
			if(index !== this.dragTag) {
				let tarEnd = document.querySelectorAll('.image-item')[index];
				tarEnd.style.borderColor = '#E6E5E3'; // #E6E5E3
				this.dragEnd = -1;
			}
		}
    render () {
      // console.log('dialog')
			const { uploadList, setMark } = this.state;
			const { getShow:show, imgType, desc_img, getShowTab, albumList } = this.props;
      let tab = getShowTab;
      let isEmpty = uploadList.filter((val) => val === '').length !== 0;
        return (
						<div className="ui-dialog ui-draggable" style={{display: show?'block':'none'}} onMouseMove={this.handleMove} onMouseUp={this.handleUp}>
							<div id="sys-ibank" style={{display: 'block'}}>
						{/*<div className="ui-dialog ui-draggable" style={{display: show?'block':'none'}} onClick={this.handleHide}>*/}
							{/*<div id="sys-ibank" style={{display: "block"}} onClick={this.handleStopPropagate}>*/}
								<div className="ib-wrap ib-multiple">
									<div className="ib-header handle" style={{background: '#f40', color: '#fff'}}>
										<h3>插入图片</h3>
										<a className="close big_close" href="javascript:void(0); " title="关闭" style={{}} onClick={this.handleHide}>×</a>
									</div>
									<div className="ib-content">
										<div className="tabs">
											<div className="tabs-nav">
												<div className="tips">选择您要添加图片的来源</div>
												<ul className="fd-clr">
													<li className={`tab-upload ${tab == 2 ? 'current2' : 'backgr-none'} tab-list tab-list2`} onClick={this.handleChangeTab.bind(this, 2)} style={{display: desc_img.length > 0?'list-item':'none'}}>从详细说明中</li>
													<li className={`tab-album ${tab == 0 ? 'current2' : 'backgr-none'} tab-list tab-list2`} onClick={this.handleChangeTab.bind(this, 0)} style={{display: 'list-item'}}>我的电脑</li>
													{/*<li className={`tab-upload ${tab == 1 ? 'current2' : 'backgr-none'} tab-list tab-list2`} onClick={this.handleChangeTab.bind(this, 1)} style={{display: imgType?'list-item':'none'}}>网络图片</li>*/}
												</ul>
											</div>
											<div className="tabs-content upload" style={{display: tab == 0?'block':'none'}}>
												<div className="info">如果您不希望上传的图片在相册中公开展示，建议将图片上传到不公开相册中</div>
												<div className="upload-form">

												<dl>
													<dt>选择相册：</dt>
													<dd>
															<select style={{visibility: 'visible'}}  onChange={this.handleAlbumSel}>
															{
																albumList.my && 
																<optgroup label="默认相册">
																	{
																		albumList.my.map((val, i) => {
																			return <option value={val.id} title={val.name} key={i}>{val.name}</option>
																		})
																	}
																</optgroup>
															}
															{
																albumList.custom && 
																<optgroup label="自定义相册">
																	{
																		albumList.custom.map((val, i) => {
																			return <option value={val.id} title={val.name} key={i}>{val.name}</option>
																		})
																	}
																</optgroup>
															}
														</select>
														{/*<a className="album-create" title="创建新相册" href="javascript:;">创建新相册</a>*/}
													</dd>
												</dl>

													<dl>
														<dt>上传图片：</dt>
														<dd className="uploader ui-flash" id="ui-flash953" aria-disabled="false">
															<div className="upload-btngroup">
																{/*<button className="upload-btn" id="upload-btn"
																	style={{background:uploadList.indexOf('') === -1?'buttonface':'#f40',borderColor:uploadList.indexOf('') === -1?'#ddd':'#f40',borderRadius: 0, font: '700 16px/30px "\\5B8B\\4F53"'}}>
																	{/*style={{background:uploadList.indexOf('') === -1?'buttonface':'url(static/images/btn4.png) -2px -2px no-repeat',borderColor:uploadList.indexOf('') === -1?'#ddd':'#EF8215'}}>*
																		请选择图片上传
																	</button>*/}
																	
																{/*<form id='formId' encType="multipart/form-data"  ref="fileUpload">
																	<input type="file" id="localimg" accept="image/jpg,image/jpeg,image/png,image/gif" className="file-change" name="file" onChange={this.handleUpload} disabled={uploadList.indexOf('') === -1}/>
																</form>*/}
															</div>
														</dd>
													</dl>
													{/*<dl>
														<dt></dt>
														<dd>
															<input id="album-watermark" name="album-watermark" type="checkbox" checked={setMark} onChange={this.handleMark}/><label htmlFor="album-watermark">添加图片水印</label>
															<a title="设置图片水印" href="//picman.1688.com/album/print_set.htm" target="_blank">设置图片水印</a>
														</dd>
													</dl>*/}
												</div>
												<div className="tips">
													<p className="d">提示：您可以上传<span>1</span>张图片，选择的图片单张大小不超过3MB，支持jpg,jpeg,png</p>
													{/*<p className="d">提示：您可以上传<span>1</span>张图片，选择的图片单张大小不超过3MB，支持jpg,jpeg,gif,png</p>*/}
													<div className="indicator">
														<table></table>
													</div>
													{/*<div className="create" style={{display: "none"}}>
														<div className="ib-header">
															<h5>创建新相册</h5>
															<a className="close " href="javascript:;" title="关闭" data-spm-anchor-id="0.0.0.0"></a>
														</div>
														<div className="ib-content">
															<form autoComplete="off">
																<dl>
																	<dt>相册名称：</dt>
																	<dd><input className="create-field" type="text" name="name" maxLength="25" />
																	</dd>
																</dl>
																<dl className="authority">
																	<dt>访问权限：</dt>
																	<dd><input id="album-manager-pub" type="radio" name="isPrivate" defaultValue="n" defaultChecked="checked" /> <label htmlFor="album-manager-pub">公开</label>
																		<input id="album-manager-pwd" type="radio" name="isPrivate" defaultValue="y" /> <label htmlFor="album-manager-pwd">密码</label>															<input id="album-manager-pri" type="radio" name="isPrivate" defaultValue="p" /> <label htmlFor="album-manager-pri">不公开</label>															<img title="不公开的相册不会显示在您的公开相册列表中" alt="" src="static/images/ask.gif" />
																	</dd>
																</dl>
																<div className="create-pwd" style={{display:"none"}}>
																	<dl>
																		<dt>密码：</dt>
																		<dd><input className="create-field" type="password" name="password" maxLength="16" /><br /><span>(4~16位非中文字符)</span></dd>
																	</dl>
																	<dl>
																		<dt>确认密码：</dt>
																		<dd><input className="create-field" type="password" name="passwordConfirm" maxLength="16" /></dd>
																	</dl>
																</div>
																<dl className="error" style={{display: "none"}}>
																	<dt></dt>
																	<dd></dd>
																</dl>
															</form>
														</div>
														<div className="ib-footer"><a className="button insert" href="javascript:;"><span
														className="btn-l"><em>创建</em></span><span className="btn-r"></span></a></div>
													</div>*/}
												</div>
											</div>
											<div className="tabs-content upload" style={{display: tab == 1?'block':'none'}}>
												<div className="online-adder">
													<dl>
														<dt>输入网上图片地址</dt>
														<dd>
															<input className="Img_url" type="text" maxLength="800" defaultValue="http://" onChange={this.handleInputUrl}/>
															<div className="tip">抱歉，该图片无法加载！</div>
														</dd>
														<dd>
															<a className="button" href="javascript:void(0);" onClick={this.handleAddUrl}>
																<p className="btn-l add_url_Img" style={{background: '#f40',paddingLeft:0}}><em style={{color: '#fff'}}>添加</em></p><span className="btn-r"></span>
															</a>
														</dd>
													</dl>
												</div>
												<div className="tips">
													<p className="d">提示：请输入阿里巴巴集团网站的链接（阿里巴巴、天猫、淘宝网等），其他网站链接系统不支持输入。</p>
													<div className="indicator">
														<table></table>
													</div>
													{/*<div className="create" style={{display: 'none'}}>
														<div className="ib-header">
															<h5>创建新相册</h5>
															<a className="close " href="javascript:;" title="关闭" data-spm-anchor-id="0.0.0.0"></a>
														</div>
														<div className="ib-content">
															<form autoComplete="off">
																<dl>
																	<dt>相册名称：</dt>
																	<dd><input className="create-field" type="text" name="name" maxLength="25" />
																	</dd>
																</dl>
																<dl className="authority">
																	<dt>访问权限：</dt>
																	<dd><input id="album-manager-pub" type="radio" name="isPrivate" defaultValue="n" defaultChecked="checked" /> <label htmlFor="album-manager-pub">公开</label>
																		<input id="album-manager-pwd" type="radio" name="isPrivate" defaultValue="y" /> <label htmlFor="album-manager-pwd">密码</label>															<input id="album-manager-pri" type="radio" name="isPrivate" defaultValue="p" /> <label htmlFor="album-manager-pri">不公开</label>															<img title="不公开的相册不会显示在您的公开相册列表中" alt="" src="static/images/ask.gif" />
																	</dd>
																</dl>
																<div className="create-pwd" style={{display:"none"}}>
																	<dl>
																		<dt>密码：</dt>
																		<dd><input className="create-field" type="password" name="password" maxLength="16" /><br /><span>(4~16位非中文字符)</span></dd>
																	</dl>
																	<dl>
																		<dt>确认密码：</dt>
																		<dd><input className="create-field" type="password" name="passwordConfirm" maxLength="16" /></dd>
																	</dl>
																</div>
																<dl className="error" style={{display:"none"}}>
																	<dt></dt>
																	<dd></dd>
																</dl>
															</form>
														</div>
														<div className="ib-footer"><a className="button insert" href="javascript:;"><span
														className="btn-l"><em>创建</em></span><span className="btn-r"></span></a></div>
													</div>*/}
												</div>
											</div>
											<div className="tabs-content upload" style={{display: tab == 2?'block':'none'}}>
												<div className="album-filter">
													<div className="tips">请选择图片所要保存到的相册</div>

													<div className='fd-locate'>
                            <AlbumSelect list={albumList} handleChange={this.handleAlbumSel}/>
														{/* <select style={{visibility: 'visible'}}  onChange={this.handleAlbumSel}>
															{
																albumList.my && 
																<optgroup label="默认相册">
																	{
																		albumList.my.map((val, i) => {
																			return <option value={val.id} title={val.name} key={i}>{val.name}</option>
																		})
																	}
																</optgroup>
															}
															{
																albumList.custom && 
																<optgroup label="自定义相册">
																	{
																		albumList.custom.map((val, i) => {
																			return <option value={val.id} title={val.name} key={i}>{val.name}</option>
																		})
																	}
																</optgroup>
															}
														</select> */}
														{/*<a className="album-create" title="创建新相册" href="javascript:;">创建新相册</a>*/}
													</div>
												</div>
												<div className="album-list">
													<ul className="fd-clr">
														{
															desc_img.map((val, i) => {
																return <li className={`pointer ${false?'selected':''}`} key={i} onClick={this.handleDescImgClick.bind(this, val, i)}>
																				<span>
																					<img width="64" height="64" src={val}/>
																				</span>
																				<div></div>
																			</li>
															})
														}
													</ul>
												</div>
											</div>
											<div className="insert">
												<div className="insert-header">
													<h4>要插入的图片</h4>
													<div className="tips">可通过拖拽调整图片顺序</div>
												</div>
												<div className="insert-content">
													<ul className="insert-pool fd-clr ui-portlets">
														{
															uploadList.map((val, i) => {
																if(val)
																	return <li className="image-item" key={i} 
																						onMouseDown={this.handleDown.bind(this, i)} 
																						onMouseEnter={this.handleEnter.bind(this, i)} 
																						onMouseLeave={this.handelLeave.bind(this, i)} 
																						>
																					<div title={''}>
																						<img alt="" src={val.src} width={val.width>val.height?64:val.width/val.height*64} height={val.width>val.height?val.height/val.width*64:64}/>
																					</div>
																					<a title="点击删除该图片" href="###" onClick={this.handleDel.bind(this, i)} onMouseDown={this.handleDelDown}></a>
																				</li>
															})
														}
													</ul>
													<ul className="insert-bg fd-clr">
														{
															uploadList.map((val, i) => {
																return <li key={i}>{i+1}</li>
															})
														}
													</ul>
													<div className="insert-notice fd-clr"></div>
												</div>
											</div>
										</div>
										<div className="ib-footer action">
											{/*<a className="button" href="javascript:;">*/}
												<p style={{background: '#f40',paddingRight: '2px', cursor: 'pointer'}} className="addimg btn-l button" onClick={this.handleSave}>
													<em style={{color:'#fff'}}>插入图片</em>
												</p>
												<span className="btn-r"></span>
											{/*</a>*/}
										</div>
										<div className="overlay" style={{display: 'none'}}></div>
									</div>
								</div>
								{show && isEmpty ? <CropperWin cropperUrl={this.state.cropperUrl} showCrop={this.state.showCrop} setCropperUrl={this.setCropperUrl} uploadCropper={this.uploadCropper}/>:''}
							</div>
						</div>
        )
    }
}

// const ImageDialog = pureRender(ImageDialogOrigin)
export default ImageDialog