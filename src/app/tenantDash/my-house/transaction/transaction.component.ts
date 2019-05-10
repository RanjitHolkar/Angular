import { Component, OnInit } from '@angular/core';
import { TenantService} from '../../../_services/tenant.service';
import html2canvas from 'html2canvas'; 
import * as jspdf from 'jspdf';  
declare var $;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
public in_progress_payment:any;
public transactionHistory:any;
public unitData:any;
public unit_id:any;
public landDetails:any;
public land_id:any;
public tenantPrfilePhoto:any;
public transaction:any;
public additonal:any;
public deduction:any;


  constructor(private tenantService:TenantService) { }

  ngOnInit() {

    this.tenantService.getTransactionDetails().subscribe((data)=>{
      console.log(data);
    this.in_progress_payment=data['in_progress_payment'];
    this.transactionHistory=data['transaction_data'];
    this.unitData=data['unit_data'][0];
    this.unit_id=this.unitData['id'];
    this.landDetails=data['landlord_details'];
    this.land_id=this.landDetails['id'];
    this.tenantPrfilePhoto=this.unitData['profilephoto'];
    });
  }
  showReciptPopup(transaction_id)
  {
    this.tenantService.getReciptData(transaction_id).subscribe((data)=>{
     this.transaction=data['transaction'];
     this.additonal=data['additonal'];
     this.deduction=data['deduction'];
     console.log(data);
    })
    $('#myModalRecipt').modal('show');
  }
  hideRecipt()
  {
    $('#myModalRecipt').modal('hide');
  }
  genratePdf()
  {
    var data = document.getElementById('PdfRecipt');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Transaction.pdf'); // Generated PDF   
    });  
    
  }
}
