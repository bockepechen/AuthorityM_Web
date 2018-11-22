<template>
    <div class="image-editor">
        <Row :gutter="10">
            <Col span="12">
                
                    <Col span="14" class="image-editor-con1">
                     <div class="cropper">
                                <img id="cropimg1"src="static/images/logo.jpg" alt="">
                    </div>
                    </Col>
                    <Row type="flex" justify="center" align="middle" class="image-editor-con1-preview-con">
                                <div id="preview1"></div>
                            </Row>
                            <div class="image-editor-con1-btn-con margin-top-10">
                                <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange1" id="fileinput1" class="fileinput" />
                                
                                <span><Button @click="handlecrop1" type="primary" icon="crop">裁剪</Button></span>
                            </div>
                            <Modal v-model="option1.showCropedImage">
                                <p slot="header">预览裁剪之后的图片</p>
                                <img :src="option1.cropedImg" alt="" v-if="option1.showCropedImage" >
                            </Modal>
                           <!--  <img :src="option1.cropedImg" alt="" v-if="option1.showCropedImage" style="width: 100%;"> -->
                        
                
            </Col>
            <Col span="12">
            </Col>
        </Row>
       
    </div>
</template>

<script>
import Cropper from 'cropperjs';
import './cropper.min.css';
export default {
    name: 'image-editor',
    data () {
        return {
            cropper1: {},
            option1: {
                showCropedImage: false,
                cropedImg: ''
            },
            
        };
    },
    methods: {
        handleChange1 (e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                this.cropper1.replace(reader.result);
                reader.onload = null;
            };
            reader.readAsDataURL(file);
        },
        handlecrop1 () {
            let options={"width":640,"height":320}
             console.log(this.cropper1.getCroppedCanvas())
            let file = this.cropper1.getCroppedCanvas({ width: 320, height: 90 }).toDataURL();
           //  let file = this.cropper1[getCroppedCanvas]({ width: 160, height: 90 }).toDataURL();
            this.option1.cropedImg = file;
            this.option1.showCropedImage = true; 
            
        },
         handlecrop2 () {
          
            let file = this.cropper1.getCroppedCanvas().toDataURL();
            console.log(this.file)
            this.option1.cropedImg = file;
            this.option1.showCropedImage = true;
        } 
    },
    mounted () {
         let img1 = document.getElementById('cropimg1');
        this.cropper1 = new Cropper(img1, {
            dragMode: 'move',
            preview: '#preview1',
            restore: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            toggleDragModeOnDblclick: false
        });
        
        
    }
};
</script>

<style>
.image-editor{
    width: 100%;
    height: 200px;
}
.cropper{
    box-sizing: border-box;
    border: 1px solid #c3c3c3;
    width: 300px;
    height: 300px;
    
}
.cropper img{
    max-height: 100%;
}

</style>
