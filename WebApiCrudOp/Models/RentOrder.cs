//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApiCrudOp.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class RentOrder
    {
        public int customer_id { get; set; }
        public string customer_name { get; set; }
        public Nullable<int> phone_num { get; set; }
        public Nullable<System.DateTime> pick_up_date { get; set; }
        public Nullable<System.DateTime> drop_off_date { get; set; }
        public int car_id { get; set; }
    }
}
