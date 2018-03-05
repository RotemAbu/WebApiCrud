using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiCrudOp.Models;
//for log file
using System.Configuration; 
using System.IO;
using GeneralPro;
using System.Text;

namespace WebApiCrudOp.api
{
    // Route 
    [RoutePrefix("api/Car")]
    public class CarController : ApiController
    {
        // CarDBEntities object point
        WebCrudDBEntities dbContext = null;

        // Constructor 
        public CarController()
        {
            // create instance of an object
            dbContext = new WebCrudDBEntities();
           
        }
//=========================================================================================// 
        [ResponseType(typeof(Car))]
        [HttpPost]
        public HttpResponseMessage SaveCar(Car acar)
        {
            int result = 0;
            try
            {
                              
                dbContext.Car.Add(acar);
                dbContext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {
                result = 0;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
//=========================================================================================// 
        [ResponseType(typeof(Car))]
        [HttpPut]
        public HttpResponseMessage UpdateCar(Car acar)
        {
            int result = 0;
            try
            {
                dbContext.Car.Attach(acar);
                dbContext.Entry(acar).State = EntityState.Modified;
                dbContext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {
                result = 0;
            }

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        //=========================================================================================//
        [Route("DeleteCar/{car_id:int}")]
        [ResponseType(typeof(Car))]
        [HttpDelete]
        public HttpResponseMessage DeleteCar(int car_id)
        {
            int result = 0;
            //Car car = null;
            try
            {
               var car = dbContext.Car.Where(x => x.car_id == car_id).FirstOrDefault();
                //var car = (from x in dbContext.Car
                //       where (x.car_id == car_id)
                //       select x).SingleOrDefault();
              
                //if (car != null)
                //{
                //foreach (var car in dbContext.Car)
                //{
                //    if (car.car_id == car_id)
                //    {
                        dbContext.Car.Attach(car); //Begins tracking the given entity in the Unchanged state such that no operation will be performed when SaveChanges() is called.
                        dbContext.Car.Remove(car);
                        dbContext.SaveChanges();
                        result = 1;
                //    }
               // }
                   
                //}
               // else { result = 0; }
           
        }
            catch (Exception e)
            {
                result = 0;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
            
        }
//=========================================================================================// 
        [Route("GetCarByID/{car_id:int}")]
        [ResponseType(typeof(Car))]
        [HttpGet]
        public Car GetCarByID(int car_id)
        {
            Car acar = null;
            try
            {
                acar = dbContext.Car.Where(x => x.car_id == car_id).SingleOrDefault();
            }
            catch (Exception e)
            {
                acar = null;
            }
            return acar;
        }

        //=========================================================================================// 
        [Route("GetUserByID/{customer_id:int}")]
        [ResponseType(typeof(User))]
        [HttpGet]
        public User GetUserByID(int customer_id)
        {
            User usr = null;
            try
            {
                usr = dbContext.User.Where(x => x.customer_id == customer_id).SingleOrDefault();
            }
            catch (Exception e)
            {
                usr = null;
            }
            return usr;
        }
        //=========================================================================================// 
        [ResponseType(typeof(Car))]
        [HttpGet]
        public List<Car> GetCars()
        {
            List<Car> cars = null;
            try
            {
                cars = dbContext.Car.ToList();
            }
            catch (Exception e)
            {
                cars = null;
            }
            return cars;
        }
//=========================================================================================// 
        public int RentCarId(Car c) //function Pass is sending car object for get car_id
        {               
            var c_id = c.car_id;
            return c_id;

        }
//=========================================================================================// 
        [ResponseType(typeof(RentOrder))] //function RentCar sending user object to save order in usertbl
        [HttpPost]
        public HttpResponseMessage RentCar(RentOrder arent)
        {
            int result = 0;
            try
            {                            
                dbContext.RentOrder.Add(arent);
                dbContext.SaveChanges();
                using (StreamWriter file = new StreamWriter(@"C:\Intel\filewebapi.txt", true))
                {
                    file.WriteLine("Customer Id: " + arent.customer_id);
                    file.WriteLine("Customer Name: " + arent.customer_name);
                    file.WriteLine("Car Id: " + arent.car_id);
                    file.WriteLine("Pick Up Date: " + arent.pick_up_date);
                    file.WriteLine("Drop Off Date: " + arent.drop_off_date);
                    file.WriteLine("//===============================//");
                }
                result = 1;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                result = 0;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        //=========================================================================================// 
     
        [ResponseType(typeof(RentOrder))]
        [HttpPost]
        public HttpResponseMessage AvailableDate(RentOrder rnt)
        {
            int result = 1;
            //RentOrder usrid = null;           
            //RentOrder dateCheck = null;
            
            try
            {
                //usrid = dbContext.RentOrder.Where(x => x.car_id == rnt.car_id && (x.pick_up_date >= rnt.pick_up_date && x.drop_off_date <= rnt.drop_off_date)).SingleOrDefault();
                            
                var start = rnt.pick_up_date.Value.Date;
                var end = rnt.drop_off_date.Value.Date;
                
                foreach (var v in dbContext.RentOrder)
                {
                    if ((v.car_id == rnt.car_id) && ((v.pick_up_date.Value.Date <= start) && (v.drop_off_date.Value.Date >= end)))
                    {                    
                                result = 0;
                                break;
                    }
                    if (start < DateTime.Now.AddDays(-1) || end < DateTime.Now.AddDays(-1))
                    {
                        result = 2;
                        break;
                    }
                    if (end < start)
                    {
                        result = 3;
                        break;
                    }
                }

                //dateCheck = (from x in dbContext.RentOrder
                //             where ((x.car_id == rnt.car_id) && 
                //             (x.pick_up_date.Value.Date >= start && x.drop_off_date.Value.Date <= end))
                //             select x).SingleOrDefault();           

                //    if (dateCheck != null)
                //    { result = 0; }
                //    else
                //    { result = 1; }

            }
            catch (Exception e)
            {
                //Console.WriteLine(e);
                result = 1;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //=========================================================================================// 
        [ResponseType(typeof(User))] //register new user
        [HttpPost]
        public HttpResponseMessage SaveUser(User ausr)
        {
            int result = 0;
            try
            {
                dbContext.User.Add(ausr);
                dbContext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {
                result = 0;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        //=========================================================================================//
        [ResponseType(typeof(User))] //existing user
        [HttpPost]
        public HttpResponseMessage LoginUser(User ausr)
        {
            int result = 0;
            User userExist = null;
            try
            {
                 userExist = (from x in dbContext.User
                             where ((x.customer_id == ausr.customer_id) && (x.password == ausr.password))
                             select x).SingleOrDefault();

                if (userExist != null) //if found in db
                {
                    result = 1;
                }
                else { result = 0; } //it's new user
            }
            catch (Exception e)
            {
                result = 0;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        //=========================================================================================//
        [HttpPost]
        public HttpResponseMessage FileLogg()
        {
            int result = 0;

            try
            {                             
                using (StreamWriter file = new StreamWriter(@"C:\Intel\filewebapi.txt", true))
                {
                    file.WriteLine("");                    
                }

                result = 1;
            }
            catch(Exception e)
            {
                result = 0;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

    }
}
