import React from 'react'
import ReactDom from 'react-dom'
import fetchs from './fetchs'// 异步数据
import BD from './BaseData'
// import Cropper from 'cropperjs'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import { is } from 'immutable'

// import Mock from 'mockjs'
// Mock.setup({ timeout: '1000-2000' })
// Mock.mock('http://tools.17zwd.com/al/image/outside/base', 'hhh');

class CropperWin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ratio: 1 / 1,
            cropperUrl: '',
            isIE9: false,
        }
    }
    componentWillMount(){
      var browser=navigator.appName 
      var b_version=navigator.appVersion 
      var version=b_version.split(';'); 
      var trim_Version=version[1].replace(/[ ]/g, ''); 
      if(browser== 'Microsoft Internet Explorer' && /MSIE[6-9]\.0/.test(trim_Version)) { // 可能采用兼容视图，因此判断范围放宽至ie9及以下
        // console.log('ie 9')
        this.setState({ isIE9: true });
      } 
    }
    componentWillReceiveProps(nextProps) {
        const { cropperUrl, showCrop } = nextProps;
        // console.log('cropperUrl: ', cropperUrl)
        if(!is(cropperUrl, this.props.cropperUrl) || !is(showCrop, this.props.showCrop)) {
          if(cropperUrl && showCrop) {
              // 如果图片不能正确加载，则对图片进行中转
              /*
              *
              * IE 上会有bug， IE10或IE9对canvas读取图片做了跨域安全限制
              * IE9 读取blob会报错，因此在IE9中使用base64
              */ 
              if(!this.state.isIE9) {
                let img = new Image();
                img.crossOrigin = '*'; // 不加不能加载
                img.src = cropperUrl;
                img.onload = (e) => {
                    // console.log('succ')
                    this.setState({cropperUrl: cropperUrl});
                    // fetchs({url: `/image/outside/base?path=${cropperUrl}`}, 'text').then((result) => {
                    //   result && this.setState({cropperUrl: result});
                    // }); // 调试

                    // this.props.setCropperUrl('');
                }
                img.onerror = async (e) => {
                    // console.log('err')
                    this.setState({cropperUrl: `${BD.httpAl}/image/outside/get?path=${cropperUrl}`});
                    // fetchs({url: `/image/outside/base?path=${cropperUrl}`}, 'text').then((result) => {
                    //   result && this.setState({cropperUrl: result});
                    // }); // 调试
                    // this.props.setCropperUrl('');
                }
              }else {
                // console.log('ie9 cropper')
                console.log('目前没有转base64的api, ie9不能进行裁剪');
                // =============方案1
                // fetchs({url: `/image/outside/base?path=${cropperUrl}`}, 'text').then((result) => {
                //   result && this.setState({cropperUrl: result});
                // }); // 调试

                // =============方案2
                // this.setState({cropperUrl: `${BD.httpAl}/image/outside/base?path=${cropperUrl}`}); // 在后台转为base64
                
                // this.props.setCropperUrl('');
              }
          }
          if(!showCrop || !cropperUrl) {
              this.setState({cropperUrl: ''});
          }
        }
    }
    getCropper = (e) => {// 图片裁剪的完成按钮
        e.preventDefault();
        const { cropperUrl } = this.state;
        if(cropperUrl) {
            try {
                const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
                // console.log(dataUrl)
                this.props.uploadCropper(dataUrl);
            }catch (e) {
                console.log('cropERR',e);
            }
        }
    }
    cancelCropper = (e) => { //图片裁剪的取消按钮
        e.preventDefault();
        // this.setState({cropperUrl: ''});
        this.props.setCropperUrl('');
    }
    changeRatio = (type) => {
        let ratio = 1 / 1;
        type == 2 && (ratio = 2 / 3);
        this.setState({ratio: ratio});
    }
    render () {
      // console.log('render cropper')
        // const { cropperUrl } = this.props;
        const { ratio, cropperUrl } = this.state;
        return (
            <div className="mod-crop" style={{ display: cropperUrl?'block':'none' }}>
                <div className="crop-bg"></div>
                <div className="crop-container-border">
                    <p className='title'>
                        图片裁剪
                        {/*图片剪裁(您选择的照片不符合横竖比2:3, 请剪裁)*/}
                    </p>
                    <span className="close_btn" onClick={this.cancelCropper}>×</span>
                    <div className="crop-container">
                        <div className="cropper-box">
                             <Cropper 
                                src={ cropperUrl }
                                style={{ height: 240, width: 468 }}
                                // Cropper.js options
                                aspectRatio={ratio}
                                viewMode={1}// 将选择框限定在图像内
                                autoCropArea={1}
                                guides={true}
                                movable={false}
                                zoomable={true}
                                zoomOnWheel={true}
                                checkCrossOrigin={true}
                                preview={ '.img-preview' }
                                minContainerWidth={ 20 }
                                ref='cropper'
                            />
                        </div>
                        <div id="preview-pane">
                            <p className='preview-title'>图片预览</p>
                            <div className="preview-container img-preview preview-lg" style={{width: `${148 * ratio}px`, height: '148px'}}>
                            </div>
                            <div className="btn-group">
                                <span className="btn" onClick={this.changeRatio.bind(this, 1)}>1:1</span>
                                <span className="btn" onClick={this.changeRatio.bind(this, 2)}>2:3</span>
                            </div>
                        </div>
                    </div>
                    <p className="crop-bottom btn-group">
                        <span className="btn" onClick={this.getCropper}>完成</span>
                        <span className="btn" onClick={this.cancelCropper}>取消</span>
                    </p>
                </div>
            </div>
        )
    }
}

export default CropperWin;
