import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {ProductProvider} from "../../providers/product/product";
import {Product} from "../shared/product";
import {CategoryListPage} from "../category-list/category-list";
import {HomePage} from "../home/home";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  product:Product;
  categoryList:any;
  subscription:any;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams,private categoryService:CategoryProvider,
              private events:Events, public alertCtrl: AlertController,private productService:ProductProvider,
              private barcodeScanner: BarcodeScanner,private camera: Camera,private imagePicker: ImagePicker ) {
    this.categoryList = CategoryListPage;
    this.product = new Product();
    this.product.categoryId = categoryService.activeCategory.id;
    this.product.categoryName = categoryService.activeCategory.name;
    this.product.images = []
    events.subscribe('category:update', (data)=>{
      console.log('events',data);
      this.product.categoryId = data.id;
      this.product.categoryName = data.name;
    })

    this.subscription = this.categoryService.getCategorySubject().subscribe((data)=>{
      console.log('subject:',data);
      this.product.categoryId = data.id;
      this.product.categoryName = data.name;
    },(error)=>{

    },()=>{

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '新增供货商',
      inputs: [
        {
          name: 'name',
          placeholder: '名称'
        },
        {
          name: 'phone',
          placeholder: '电话'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '保存',
          handler: data => {
            console.log(data);
            console.log('Saved clicked');
            this.product.pname=data.name;
            this.product.phone=data.phone;
          }
        }
      ]
    });
    prompt.present();
  }

  add(){
    this.productService.add(this.product);
    this.navCtrl.push(HomePage);
  }
  saveAndNew(){
    this.productService.add(this.product);
    this.product.id = '';
    this.product.barcode = '';
    this.product.category = '';
    this.product.name = '';
    this.product.categoryName = '';
    this.product.images = [];
    this.product.price = null;
    this.product.stock = null;
    this.product.purchasePrice = null;
    this.product.pname = '';
    this.product.spec = '';
  }



  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.product.barcode = barcodeData.text;

    }, (err) => {
      // An error occurred
    });
  }

  cameraPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  pickImages() {
    // 判断是否设置了三张图片
    let options = {
      maximumImagesCount: 3,// 计算出最多能选几张
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.product.images.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => { });
  }



}
