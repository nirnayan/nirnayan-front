import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
declare var $: any;
import { environment } from 'src/environments/environment.prod'
import { ConfirmPasswordValidator } from 'src/app/auth/confirm-password.validator';



import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  patientForm: FormGroup
  submitted: boolean = false
  patients: any = []
  bloodGroup: any = []
  patientId: any
  isEdit: boolean = false
  username: any = ''
  isLandmark: boolean = false
  addressForm: FormGroup
  addressItems: any = []
  user_email: any = ''
  defaultImg: boolean = false

  map: Map;

  cardImageBase64: string;
  previewImagePath: any;
  resetForm: FormGroup
  isLandmarkName: any
  addrId: any
  profileImg: any
  mediaUrl = environment.LimsEndpointBase
  coins: any
  submitte: boolean = false
  isLoadData: boolean = false
  isPatientLoadData: boolean = false
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  mobile: any = ''
  profileEdit: boolean = false
  loadingBtn: boolean = false
  altEmail: any = ''
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  form = {
    schemaName: "nir1691144565",
    user_id: null,
    user_name: '',
    mobileNumber: '',
    recovery_email: ''
  };


  constructor(private _fb: FormBuilder,
    private _profile: ProfileService,
    private _router: Router) {
    this.patientForm = this._fb.group({
      schemaName: ['nir1691144565'],
      user_id: [''],
      patientName: ['', Validators.required],
      dob: ['', Validators.required],
      age: [{ value: '', disabled: true }],
      blood_group: ['', Validators.required],
      gender: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required]
    })

    this.addressForm = this._fb.group({
      schemaName: ['nir1691144565'],
      user_id: [''],
      addressName: ['', Validators.required],
      fullName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      alt_contactNumber: [null, ''],
      pinCode: ['', Validators.required],
      state: [''],
      city: [''],
      addressLine_1: ['', Validators.required],
      addressLine_2: ['', Validators.required],
      landMark: [null, ''],
      latitude: null,
      longitude: null
    })

    this.resetForm = this._fb.group({
      schemaName: 'nir1691144565',
      user_email: ['', [Validators.required, Validators.email]],
      old_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      confirm_password: ['', Validators.required]
    },
      {
        validator: ConfirmPasswordValidator("new_password", "confirm_password")
      })
  }

  get f() { return this.resetForm.controls; }

  get userEmail() {
    return this.resetForm.get('user_email')
  }

  get passwordFormField() {
    return this.resetForm.get('new_password');
  }

  ngOnInit(): void {
    //load Places Autocomplete
    let payload = {
      schemaName: 'nir1691144565',
      user_id: Number(localStorage.getItem('USER_ID'))
    }
    this._profile.getPatient(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.patients = res.data
      }
      else if (res.status == 503 || res.status == 403) {
        localStorage.clear();
        this._router.navigate(['/auth/login'])
      }
    })

    this.getAllAddress();

    this._profile.getBloodGroup().subscribe((res: any) => {
      if (res.status == 1) {
        this.bloodGroup = res.data
      }
    });

    $(document).ready(function () {
      $('.profCam').on('click', function () {
        $('.profCamEdit').toggleClass("open");
      });
    });

    this.getProfile()
    this.getMyCoins()
    this.getLocationMap()
    this.getCurrentLocation()

  }


  onSubmit() {
    this.loadingBtn = true
    this._profile.updateProfile(this.form).subscribe((res: any) => {
      this.loadingBtn = false
      if (res.status == 1) {
        Swal.fire({
          icon: 'success',
          text: 'Profile Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.getProfile()
        this.profileEdit = false
      } else {
        Swal.fire({
          icon: 'error',
          text: res.data,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  getProfile() {
    let userid = localStorage.getItem('USER_ID')
    this._profile.getProfileData(userid).subscribe((res: any) => {
      if (res.status == 1) {
        this.form.user_name = res.data.user_name
        this.form.mobileNumber = res.data.mobileNumber
        this.form.user_id = res.data.id
        this.form.recovery_email = res.data.recovery_email

        this.mobile = res.data.mobileNumber
        this.username = res.data.user_name
        this.user_email = res.data.email
        this.altEmail = res.data.recovery_email
        this.profileImg = res.data.profile_picture
        localStorage.setItem('USER_NAME',res.data.user_name)
        localStorage.setItem('PROFILE_IMG', res.data.profile_picture)
        this._profile.sendHeaderImg(res.data.profile_picture)
      }
    })
  }
  
  clickme(i: any) {
    $('#ifff' + i).toggleClass("oppn");
  }

  // Calculate age based on selected date
  calculateAge(selectedDate: Date) {
    const today = new Date();
    const birthDate = new Date(selectedDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Update age FormControl when date is changed
  onDateChange(event: any) {
    const selectedDate = new Date(event.target.value);
    const age = this.calculateAge(selectedDate);
    this.patientForm.controls['age'].setValue(age);
  }

  savePatient() {
    this.submitted = true
    let userId = localStorage.getItem('USER_ID')
    let form = this.patientForm.value
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": Number(userId),
      "patientName": form.patientName,
      "age": Number($('#totalAge').val()),
      "blood_group": Number(form.blood_group),
      "gender": Number(form.gender),
      "dob": form.dob,
      "height": Number(form.height),
      "weight": Number(form.weight)
    }

    if (this.patientForm.valid) {
      this.isPatientLoadData = true
      this._profile.storePatient(payload).subscribe((res: any) => {
        this.isPatientLoadData = false
        if (res.status == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          $("#patientModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
          this.ngOnInit()
        }
        else if (res.status == 503 || res.status == 403) {
          $(".modal-backdrop").removeClass("modal-backdrop show");
          localStorage.clear();
          this._router.navigate(['/auth/login'])
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      })
    }
  }

  editPatient(id: any) {
    this.isEdit = true
    this.patientId = id
    let payload = {
      "schemaName": "nir1691144565",
      "patient_id": id
    }
    this.isPatientLoadData = true
    this._profile.getPatientById(payload).subscribe((res: any) => {
      this.isPatientLoadData = false
      if (res.status == 1) {
        this.patientForm.get("patientName").setValue(res.data.patient_name);
        this.patientForm.get("age").setValue(res.data.age);
        this.patientForm.get("blood_group").setValue(res.data.blood_group);
        this.patientForm.get("gender").setValue(res.data.gender);
        this.patientForm.get("dob").setValue(res.data.dob);
        this.patientForm.get("height").setValue(res.data.height);
        this.patientForm.get("weight").setValue(res.data.weight);
      }
    })
  }

  updatePatient() {
    this.submitted = true
    let form = this.patientForm.value
    let payload = {
      "schemaName": "nir1691144565",
      "patient_id": Number(this.patientId),
      "patientName": form.patientName,
      "age": Number($('#totalAge').val()),
      "blood_group": Number(form.blood_group),
      "gender": Number(form.gender),
      "dob": form.dob,
      "height": Number(form.height),
      "weight": Number(form.weight)
    }
    if (this.patientForm.valid) {
      this.isPatientLoadData = true
      this._profile.updatePatients(payload).subscribe((res: any) => {
        this.isPatientLoadData = false
        if (res.status == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          $("#patientModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
          this.ngOnInit();
          this.isEdit = false
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      })
    }
  }

  deleteItem(id: any) {
    let payload = {
      "schemaName": "nir1691144565",
      "patient_id": id
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to remove this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove'
    }).then((result) => {
      if (result.isConfirmed) {
        this._profile.deletePatient(payload).subscribe((res: any) => {
          if (res.status == 1) {
            this.ngOnInit()
          }
        })
      }
    })

  }

  addAddressFunc() {
    this.addressForm.reset()
  }

  addPatient() {
    this.patientForm.reset()
  }
  // Address Start
  saveAddress() {
    this.submitted = true
    if (this.addressForm.valid) {
      this.isLoadData = true
      this.addressForm.value['schemaName'] = 'nir1691144565'
      this.addressForm.value['pinCode'] = Number(this.addressForm.value['pinCode'])
      this.addressForm.value['contactNumber'] = Number(this.addressForm.value['contactNumber'])
      this.addressForm.value['alt_contactNumber'] = Number(this.addressForm.value['alt_contactNumber'])
      this.addressForm.value['user_id'] = Number(localStorage.getItem('USER_ID'))
      delete this.addressForm.value['state']
      delete this.addressForm.value['city']
      this._profile.storeAddress(this.addressForm.value).subscribe((res: any) => {
        this.isLoadData = false
        if (res.status == 1) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Address saved successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          this.addressForm.reset()
          this.getAllAddress()
          this.ngOnInit()
          $("#addressModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data,
          });
        }
      })
    }
  }

  getAllAddress() {
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": localStorage.getItem('USER_ID')
    }
    this._profile.getAddress(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.addressItems = res.data
      }
    })

    // this.getLatLong()

  }

  removeProfle() {
    let formData = new FormData();
    formData.append('schemaName', 'nir1691144565');
    formData.append('user_id', localStorage.getItem('USER_ID'));
    formData.append('profile_picture', null);

    this._profile.storeProfileImg(formData).subscribe((res: any) => {
      if (res.status == 1) {
        this.cardImageBase64 = null
        Swal.fire({
          position: "center",
          text: "Profile has been changed!",
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload();
      }
    })
  }

  profileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = (rs) => {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            let formData = new FormData();
            formData.append('schemaName', 'nir1691144565');
            formData.append('user_id', localStorage.getItem('USER_ID'));
            formData.append('profile_picture', event.target.files[0]);

            this._profile.storeProfileImg(formData).subscribe((res: any) => {
              if (res.status == 1) {
                this.cardImageBase64 = null
                Swal.fire({
                  position: "center",
                  icon: "success",
                  text: "Profile changed successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
                this.getProfile()
              }
            })
          };
        };

        reader.readAsDataURL(event.target.files[0]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Sorry...",
          text: "Only image allowed!",
        });
      }
    }
  }

  // Get Coins
  getMyCoins() {
    let payload = {
      "schemaName": "nir1691144565",
      "userID": localStorage.getItem('USER_ID')
    }
    this._profile.getCoins(payload).subscribe((res: any) => {
      if (res.status == 1) {
        this.coins = res.data
      }
    })
  }


  editAddr(id: any) {
    this.isEdit = true
    this.addrId = id
    let payload = {
      "schemaName": "nir1691144565",
      "addressID": id
    }
    this.isLoadData = true
    this._profile.getAddressById(payload).subscribe((res: any) => {
      this.isLoadData = false
      if (res.status == 1) {
        // this.patientForm.get("addressName").setValue(res.data[0].addressName);
        this.addressForm.get("fullName").setValue(res.data[0].fullName);
        this.addressForm.get("contactNumber").setValue(res.data[0].contactNumber);
        this.addressForm.get("alt_contactNumber").setValue(res.data[0].alt_contactNumber);
        this.addressForm.get("pinCode").setValue(res.data[0].pinCode);
        this.addressForm.get("state").setValue(res.data[0].state);
        this.addressForm.get("city").setValue(res.data[0].city);
        this.addressForm.get("addressLine_1").setValue(res.data[0].addressLine_1);
        this.addressForm.get("addressLine_2").setValue(res.data[0].addressLine_2);
        this.addressForm.get("landMark").setValue(res.data[0].landMark);
        this.isLandmarkName = res.data[0].addressName

      }
    })
  }

  updateAddress() {
    if (this.addressForm.valid) {
      this.isLoadData = true
      this.addressForm.value['schemaName'] = 'nir1691144565'
      this.addressForm.value['user_id'] = Number(localStorage.getItem('USER_ID'))
      this.addressForm.value['addressID'] = this.addrId
      this.addressForm.value['contactNumber'] = Number($('#mobile').val())
      this.addressForm.value['alt_contactNumber'] = Number($('#alt_mobile').val())
      this._profile.updateAddress(this.addressForm.value).subscribe((res: any) => {
        this.isLoadData = false
        if (res.status == 1) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Updated successfully !",
            showConfirmButton: false,
            timer: 1500
          });
          this.isEdit = false
          $("#addressModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
          this.ngOnInit();
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      })
    }
  }

  deleteAddrs(id: any) {
    let payload = {
      "schemaName": "nir1691144565",
      "addressID": id
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._profile.deleteAddr(payload).subscribe((res: any) => {
          if (res.status == 1) {
            this.ngOnInit()
          }
        })
      }
    });
  }

  submitReset() {
    this.submitte = true
    if (this.resetForm.valid) {
      this._profile.resetPassword(this.resetForm.value).subscribe((res: any) => {
        if (res.status == 1) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your password has been changed!",
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit()
          this.resetForm.reset()
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data,
          });
        }
      })
    }
  }

  passwordVisible = false;
  confpasswordVisible = false;
  togglePasswordVisibility(msg: any): void {
    if (msg == 'new') {
      this.passwordVisible = !this.passwordVisible;
    } else {
      this.confpasswordVisible = !this.confpasswordVisible;
    }
  }

  // Current location
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          // You can now use latitude and longitude values as needed
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out.');
              break;
            case error.code:
              console.error('An unknown error occurred.');
              break;
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  getLocationMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([88.3639, 22.5726]), // Kolkata coordinates
        zoom: 12 // Zoom level
      })
    });

    // Add marker
    const marker = new Feature({
      geometry: new Point(fromLonLat([88.3639, 22.5726])) // Kolkata coordinates
    });

    const markerStyle = new Style({
      image: new Icon({
        src: 'assets/images/marker.png',
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        anchor: [0.5, 1],
        scale: 0.1 // Adjust the scale as needed
      })
    });

    marker.setStyle(markerStyle);
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker]
      })
    });

    this.map.addLayer(vectorLayer);

    // Listen for map click event
    this.map.on('click', (event) => {
      const coordinate = event.coordinate;
      console.log('Clicked Coordinate:', coordinate);
      // Clear existing markers
      vectorLayer.getSource().clear();
      // Add new marker at clicked coordinate
      const clickedMarker = new Feature({
        geometry: new Point(coordinate)
      });
      clickedMarker.setStyle(markerStyle);
      vectorLayer.getSource().addFeature(clickedMarker);
    });

  }
}
