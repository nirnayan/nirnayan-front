import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-encyclopedia",
  templateUrl: "./encyclopedia.component.html",
  styleUrls: ["./encyclopedia.component.css"],
})
export class EncyclopediaComponent implements OnInit {
  Package(arg0: string) {
    throw new Error("Method not implemented.");
  }
  Test(arg0: string) {
    throw new Error("Method not implemented.");
  }
  activeModule: any;

  constructor() {}

  ngOnInit(): void {}
}
