import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from './../app.service';
import { ApiService } from './../common/api.service';
import { ToastController } from '@ionic/angular';
import { Api } from './../common/api.request';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  categories: any;
  products: any;
  cartItems: any;
  badgeValue: any;
  originalProducts: any;
  constructor(private loadingController: LoadingController, private appService: AppService,
    private apiService: ApiService, private http: HttpClient,
    public toastController: ToastController, public navCtrl: NavController, private router: Router) {
    this.cartItems = [];
    this.badgeValue = JSON.parse(localStorage.getItem('badgeValue'));
    this.products = [];
  }


  ngOnInit() {
    this.getCategories();

    this.setOriginalProducts();

    this.getProducts();
  }

  ionViewWillEnter() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));

    this.badgeValue = JSON.parse(localStorage.getItem('badgeValue'));

  }




  getCategories() {
    this.categories = [
      {
        id : "1",
        name: "janX 300"
      },
      {
        id : "2",
        name: "CBR 101"
      },
      {
        id : "3",
        name: "Hammer"
      },
      {
        id : "4",
        name: "suzuki"
      },
    ];
  }



  getProducts() {
      this.products = [];
      this.products = this.originalProducts
  }

  setOriginalProducts(){
    this.originalProducts = [
      {
        id: 1,
        category_id : "3",
        name: "Nylon-blend",
        description: "Here's a list of five such features, and a few more which you should definitely look out for while buying your next commuter bike.",
        image_url: "http://demo.posthemes.com/pos_devita/layout14/1110-home_default/hd-video-recording-pj-handycam-camcorder.jpg",
        price: 120,
        qty: 1
      },
      {
        id: 2,
        category_id : "3",
        name: "Triumph Tiger",
        description: "Here's a list of five such features, and a few more which you should definitely look out for while buying your next commuter bike.",
        image_url: "http://demo.posthemes.com/pos_devita/layout14/1122-home_default/-asus-156-amd-a9-9420-8gb-1tb-windows-10-vivobook-.jpg",
        price: 110,
        qty: 1
      },
      {
        id: 3,
        category_id : "2",
        name: "Triumph Tiger",
        description: "Here's a list of five such features, and a few more which you should definitely look out for while buying your next commuter bike.",
        image_url: "http://demo.posthemes.com/pos_devita/layout14/1126-home_default/apple-iphone-7-32gb-ios-10-silver-recertified.jpg",
        price: 20,
        qty: 1
      },
      {
        id: 4,
        category_id : "1",
        name: "Triumph Tiger",
        description: "Here's a list of five such features, and a few more which you should definitely look out for while buying your next commuter bike.",
        image_url: "http://demo.posthemes.com/pos_devita/layout14/1146-home_default/canon-vista-fhd-4k-camcorder-2214c002.jpg",
        price: 100,
        qty: 1
      },
      {
        id: 5,
        category_id : "1",
        name: "Triumph Tiger",
        description: "Here's a list of five such features, and a few more which you should definitely look out for while buying your next commuter bike.",
        image_url: "http://demo.posthemes.com/pos_devita/layout14/1106-home_default/acer-122-pentium-4gb-64gb-ssd-w10-touchscreen.jpg",
        price: 200,
        qty: 1
      },
      {
        id: 6,
        category_id : "4",
        name: "Suzuki Gixxer FT 150.",
        description: "Here's a list of five such features, and a few more which you should definitely look out for while buying your next commuter bike.",
        image_url: "http://demo.posthemes.com/pos_devita/layout14/1143-home_default/sonicfuel-wireless-over-ear-headphones.jpg",
        price: 60,
        qty: 1
      },
      {
        id: 7,
        category_id : "4",
        name: "Suzuki Gixxer SF 250.",
        description: "Here's a list of five such features, and a few more which you should definitely look out for while buying your next commuter bike.",
        image_url: "http://demo.posthemes.com/pos_devita/layout14/1150-home_default/playstation-4-pro-1tb-star-wars-battlefront-ii-bundle.jpg",
        price: 140,
        qty: 1
      },
      {
        id: 8,
        category_id : "2",
        name: "Triumph Tiger",
        description: "Here's a list of five such features, and a few more which you should definitely look out for while buying your next commuter bike.",
        image_url: "http://demo.posthemes.com/pos_devita/layout14/1110-home_default/hd-video-recording-pj-handycam-camcorder.jpg",
        price: 60,
        qty: 1
      },
      

    ];
  }

  addToCart(item) {

    if (this.cartItems.length > 0) {
      let ok = 0;
      this.cartItems.forEach(element => {
        if (element.id === item.id) {
          element.qty += 1;
          ok = 1;
        }
      });
      if (ok == 0) {
        this.cartItems.push(item);
        ok = 0;
      }
    }

    if (this.cartItems.length == 0) {
      this.cartItems.push(item);
    }


    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    this.badgeValue += 1;

    localStorage.setItem('badgeValue', JSON.stringify(this.badgeValue));

  }




  openDetailsWithState(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        product: item
      }
    };
    this.router.navigate(['product'], navigationExtras);
  }

  getProductsByCategory(id) {
      this.products = [];
      this.originalProducts.forEach(element => {
        if(element.category_id == id){
          this.products.push(element);
        }
      });    

      
  }

  search(q) {
    if (q && q.trim() != '') {
      this.products = this.products.filter((item) => {
        return (item.name.toLowerCase().indexOf(q.toLowerCase()) > -1);
      })
    } else {
      this.getProducts();
    }

  }

}
