var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var multer=require('multer');
var fileUpload=require('express-fileupload');

// display user page
router.get('/', function(req, res, next) {    
    if(!req.session.adm)
    {
        res.render('users/index',{msg:""}); 
    }  
    else
    {
        res.redirect('/users/profile');
    }
});
router.get('/upload', function(req, res, next) {    
    if(!req.session.adm)
    {
        res.render('users/upload_file',{msg:""}); 
    }  
    else
    {
        res.render('users/upload_file',{msg:""}); 
    }
});
router.post('/upload_1', function(req, res, next) {    
    if(!req.session.adm)
    {
        res.render('users/upload_file',{msg:""}); 
    }  
    else
    {
        //upload
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, './Public/images')
            },
            filename: function (req, file, cb) {
              cb(null, "test" + '.jpg')
            }
          });
          var upload = multer({ storage: storage }).single('image');
          upload(req,res,function(err){
              if(err)
              {
                res.render('users/upload_file',{msg:"upload failed"});
              }
              else
              {
              res.render('users/upload_file',{msg:"upload sucessfully"});
              }
            });
        
    }
});
// add a new user
router.post('/', function(req, res, next) {   
    let adminid = req.body.adminid.trim();
    let password = req.body.password.trim(); 

    let q4="SELECT count(*) as count2 FROM admin where `adminid`='"+adminid+"' and `password`='"+password+"'";
    dbConn.query(q4,function(err,result4){
    //queries string
    if(result4[0].count2>0)
    {
        req.session.adm=adminid;
        res.redirect('/users/profile');
        
    }
    else
    {
        console.log(result4);
        res.render('users/index',{msg:"invalid login details"});   
    }
});
});
router.get('/profile', function(req, res, next) {  
    if(!req.session.adm)
    {
        res.redirect('/users/');
    }  
    else
    {
    // render to add.ejs
    let q1="SELECT * FROM student ORDER BY id desc";
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('users/profile',{data:''});   
        } else {
            // render to views/users/index.ejs
            nm=req.session.adm;
            res.render('users/profile',{data:result,nm:nm});
        }
    });
}
})
router.get('/add_student', function(req, res, next) {    
    // render to add.ejs
    if(!req.session.adm)
    {
        res.redirect('/users/');
    }  
    else
    {
        nm=req.session.adm;
    res.render('users/add_student',{nm:nm});
    }
})

router.post('/store_student', function(req, res, next) {  
    //upload
    var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random; 

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './Public/images')
        },
        filename: function (req, file, cb) {
          cb(null, random_number+'.jpg')
        }
      });
      var upload = multer({ storage: storage }).single('image');
      upload(req,res,function(err){
          if(err)
          {
           
          }
          else
          {
          //Receive Data
          let image=random_number+".jpg";
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
    let gender = req.body.gender;
    let nationality = req.body.nationality;

    

    //store into dictionary
    var form_data = {
        image:image,
        name: name,
        email: email,
        phone:phone,
        password:password,
        gender:gender,
        nationality:nationality,
    }
    //queries string
    let q1="insert into `student` set ?";
    //execution
    dbConn.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('users/add_student')
        }
        else{
            req.flash('success', 'Student successfully added');
            res.redirect('/users/profile');    
        }
    });
          }
        });
    
})
router.get('/details/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM student where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/details',{
                id: '',
                name: '',
                email: '',
                phone: '',
                password: '',
                gender: '',
                nationality: '',
            });   
        } else {
            // render to views/users/index.ejs
            res.render('users/details',{
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                phone: result[0].phone,
                password: result[0].password,
                gender: result[0].gender,
                nationality: result[0].nationality,});
        }
    });
});
router.get('/delete/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM student where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/delete',{
                id: '',
                name: '',
                email: '',
                phone: '',
                password: '',
                gender: '',
                nationality: '',
            });   
        } else {
            // render to views/users/index.ejs
            res.render('users/delete',{
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                phone: result[0].phone,
                password: result[0].password,
                gender: result[0].gender,
                nationality: result[0].nationality,});
        }
    });
    
});
router.get('/delete1/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="delete FROM student where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/delete',{
                id: '',
                name: '',
                email: '',
                phone: '',
                password: '',
                gender: '',
                nationality: '',
            });   
        } else {
            // render to views/users/index.ejs
            res.redirect('/users/profile');
        }
    });
    
})
router.get('/edit/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM student where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/edit',{
                id: '',
                name: '',
                email: '',
                phone: '',
                password: '',
                gender: '',
                nationality: '',
            });   
        } else {
            // render to views/users/index.ejs
            res.render('users/edit',{
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                phone: result[0].phone,
                password: result[0].password,
                gender: result[0].gender,
                nationality: result[0].nationality,});
        }
    });
    
});
router.post('/update_student', function(req, res, next) {  
    //Receive Data
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
    let gender = req.body.gender;
    let nationality = req.body.nationality;
    //store into dictionary
    var form_data = {
        name: name,
        email: email,
        phone:phone,
        password:password,
        gender:gender,
        nationality:nationality,
    }
    //queries string
    let q1="update `student` set ? where `id`="+id;
    //execution
    dbConn.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('users/edit',{'id':id})
        }
        else{
            req.flash('success', 'Student updated successfully');
            res.redirect('/users/profile');    
        }
    });
})


/**************course********** */

router.get('/all_course', function(req, res, next) {    
    if(!req.session.adm)
    {
        res.redirect('/users/');
    }  
    else
    {
    // render to add.ejs
    let q1="SELECT * FROM course ORDER BY id desc";
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('users/all_course',{data:''});   
        } else {
            // render to views/users/index.ejs
            res.render('users/all_course',{data:result});
        }
    });
}
})
router.get('/add_course', function(req, res, next) {  
    if(!req.session.adm)
    {
        res.redirect('/users/');
    }  
    else
    {  
    // render to add.ejs
    res.render('users/add_course')
    }
})

router.post('/store_course', function(req, res, next) {  
    //Receive Data
     var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random; 

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './Public/course')
        },
        filename: function (req, file, cb) {
          cb(null, random_number+'.jpg')
        }
      });
      var upload = multer({ storage: storage }).single('image');
      upload(req,res,function(err){
          if(err)
          {
           
          }
          else
          {
          //Receive Data
          let image=random_number+".jpg";
    let name = req.body.name;
    let tfee = req.body.tfee;
    let dfee = req.body.dfee;
    let duration = req.body.duration;
    let details = req.body.details;    
    //store into dictionary
    var form_data = {
        image:image,
        name: name,
        tfee: tfee,
        dfee:dfee,
        duration:duration,
        details:details,
    }
    //queries string
    let q1="insert into `course` set ?";
    //execution
    dbConn.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('users/add_course')
        }
        else{
            req.flash('success', 'course successfully added');
            res.redirect('/users/all_course');    
        }
    });
}});
})
router.get('/course_details/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM course where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/course_details',{
                id: '',
                name: '',
                tfee: '',
                dfee: '',
                duration: '',
            });   
        } else {
            // render to views/users/index.ejs
            res.render('users/course_details',{
                id: result[0].id,
                name: result[0].name,
                tfee: result[0].tfee,
                dfee: result[0].dfee,
                duration: result[0].duration,});
        }
    });
});
router.get('/course_delete/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM course where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/course_delete',{
                id: '',
                name: '',
                tfee: '',
                dfee: '',
                duration: '',
            });   
        } else {
            // render to views/users/index.ejs
            res.render('users/course_delete',{
                id: result[0].id,
                name: result[0].name,
                tfee: result[0].tfee,
                dfee: result[0].dfee,
                duration: result[0].duration,});
        }
    });
    
});
router.get('/course_delete1/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="delete FROM course where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/course',{
                id: '',
                name: '',
                tfee: '',
                dfee: '',
                duration: '',
            });   
        } else {
            // render to views/users/index.ejs
            res.redirect('/users/all_course');
        }
    });
    
})
router.get('/course_edit/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM course where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/course_edit',{
                id: '',
                name: '',
                tfee: '',
                dfee: '',
                duration: '',
            });   
        } else {
            // render to views/users/index.ejs
            res.render('users/course_edit',{
                id: result[0].id,
                name: result[0].name,
                tfee: result[0].tfee,
                dfee: result[0].dfee,
                duration: result[0].duration,});
        }
    });
    
});
router.post('/update_course', function(req, res, next) {  
    //Receive Data
    let id = req.body.id;
    let name = req.body.name;
    let tfee = req.body.tfee;
    let dfee = req.body.dfee;
    let duration = req.body.duration;
    //store into dictionary
    var form_data = {
        name: name,
        tfee: tfee,
        dfee:dfee,
        duration:duration,
    }
    //queries string
    let q1="update `course` set ? where `id`="+id;
    //execution
    dbConn.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('users/course_edit',{'id':id})
        }
        else{
            req.flash('success', 'course updated successfully');
            res.redirect('/users/all_course');    
        }
    });
})



/**************video********** */

router.get('/all_video', function(req, res, next) {  
    if(!req.session.adm)
    {
        res.redirect('/users/');
    }  
    else
    {  
    // render to add.ejs
    let q1="SELECT * FROM video";
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('users/all_video',{data:'',data2:''});   
        } else {
            // render to views/users/index.ejs
            let q2="SELECT * FROM course";
            dbConn.query(q2,function(err,result2){
                if(err) {
                    req.flash('error', err);
                    // render to views/users/index.ejs
                    res.render('users/all_video',{data:'',data2:''});   
                } else {
                    // render to views/users/index.ejs
                    res.render('users/all_video',{data:result,data2:result2});
                }
            });
        }
    });
}
})
router.get('/add_video', function(req, res, next) { 
    if(!req.session.adm)
    {
        res.redirect('/users/');
    }  
    else
    {   
    // render to add.ejs
    let q1="SELECT * FROM course";
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('users/add_video',{data:''});   
        } else {
            // render to views/users/index.ejs
            res.render('users/add_video',{data:result});
        }
    });
}
})

router.post('/store_video', function(req, res, next) {  
    //Receive Data
    let cid = req.body.cid;
    let Title = req.body.Title;
    let link = req.body.link;
    //store into dictionary
    var form_data = {
        cid: cid,
        Title: Title,
        link:link,
    }
    //queries string
    let q1="insert into `video` set ?";
    //execution
    dbConn.query(q1, form_data, function(err, result) {
        let q1="SELECT * FROM course";
        dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('users/add_video',{data:''});   
        } else {
            // render to views/users/index.ejs
            res.render('users/add_video',{data:result});
        }
    });
    });
})
router.get('/video_details/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM video where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/video_details',{
                id: '',
                cid: '',
                Title: '',
                link: '',
                data2:''
            });   
        } else {
            // render to views/users/index.ejs
            let q2="SELECT * FROM course";
            dbConn.query(q2,function(err,result2){
                if(err) {
                    req.flash('error', err);
                    // render to views/users/index.ejs
                    res.render('users/video_details',{
                        id: '',
                        cid:'',
                        Title: '',
                        link: '',data2:''});   
                } else {
                    // render to views/users/index.ejs
                    res.render('users/video_details',{
                        id: result[0].id,
                        cid: result[0].cid,
                        Title: result[0].Title,
                        link: result[0].link,data2:result2});
                }
            });
            
        }
    });
});
router.get('/video_delete/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM video where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/video_delete',{
                id: '',
                cid: '',
                Title: '',
                link: '',
                data2:''
            });   
        } else {
            // render to views/users/index.ejs
            let q2="SELECT * FROM course";
            dbConn.query(q2,function(err,result2){
                if(err) {
                    req.flash('error', err);
                    // render to views/users/index.ejs
                    res.render('users/video_delete',{
                        id: '',
                        cid:'',
                        Title: '',
                        link: '',data2:''});   
                } else {
                    // render to views/users/index.ejs
                    res.render('users/video_delete',{
                        id: result[0].id,
                        cid: result[0].cid,
                        Title: result[0].Title,
                        link: result[0].link,data2:result2});
                }
            });
        }
    });
    
});
router.get('/video_delete1/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="delete FROM video where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/video',{
                id: '',
                cid: '',
                Title: '',
                link: '',
            });   
        } else {
            // render to views/users/index.ejs
            res.redirect('/users/all_video');
        }
    });
    
})
router.get('/video_edit/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM video where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/video_edit',{
                id: '',
                cid: '',
                Title: '',
                link: '',
                data2:''
            });   
        } else {
            // render to views/users/index.ejs
            let q2="SELECT * FROM course";
            dbConn.query(q2,function(err,result2){
                if(err) {
                    req.flash('error', err);
                    // render to views/users/index.ejs
                    res.render('users/video_edit',{
                        id: '',
                        cid:'',
                        Title: '',
                        link: '',data2:''});   
                } else {
                    // render to views/users/index.ejs
                    res.render('users/video_edit',{
                        id: result[0].id,
                        cid: result[0].cid,
                        Title: result[0].Title,
                        link: result[0].link,data2:result2});
                }
            });
        }
    });
    
});
router.post('/update_video', function(req, res, next) {  
    //Receive Data
    let id = req.body.id;
    let cid = req.body.cid;
    let Title = req.body.Title;
    let link = req.body.link;
    //store into dictionary
    var form_data = {
        cid: cid,
        Title: Title,
        link:link,
        
    }
    //queries string
    let q1="update `video` set ? where `id`="+id;
    //execution
    dbConn.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('users/video_edit',{'id':id})
        }
        else{
            req.flash('success', 'video updated successfully');
            res.redirect('/users/all_video');    
        }
    });
})

/********************order******************* */

router.get('/all_order', function(req, res, next) {    
    // render to add.ejs
    let q1="SELECT * FROM myorder";
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('users/all_order',{data:'',data2:'',data3:''});   
        } else {
            // render to views/users/index.ejs
            let q2="SELECT * FROM course";
            dbConn.query(q2,function(err,result2){
                if(err) {
                    req.flash('error', err);
                    // render to views/users/index.ejs
                    res.render('users/all_order',{data:'',data2:'',data3:''});   
                } else {
                    // render to views/users/index.ejs
                    let q3="SELECT * FROM student";
                    dbConn.query(q3,function(err,result3){
                    
                    res.render('users/all_order',{data:result,data2:result2,data3:result3});
                    });
                }
            });
        }
    });
})
router.get('/add_order', function(req, res, next) {    
    // render to add.ejs
    let q1="SELECT * FROM course";
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            res.render('users/add_order',{data:'',data2:'',msg:''});   
        } else {
            // render to views/users/index.ejs
            let q2="SELECT * FROM student";
            dbConn.query(q2,function(err,result2){
            res.render('users/add_order',{data:result,data2:result2,msg:''});
            });
        }
    });
})

router.post('/store_order', function(req, res, next) {  
    //Receive Data
    let sid = req.body.sid;
    let cid = req.body.cid;
    let tfee = req.body.tfee;
    let pfee = req.body.pfee;
    let due_amount=tfee-pfee;
    //store into dictionary
    var form_data = {
        sid: sid,
        cid: cid,
        tfee: tfee,
        pfee:pfee,
        due_amount:due_amount,
    }
    let q3="SELECT COUNT(*) AS count1 FROM myorder where `sid`="+sid+" and `cid`="+cid;
    dbConn.query(q3,function(err,result3){
    //queries string
    if(result3[0].count1>0)
    {
        res.render('users/add_order',{data:'',data2:'',msg:"course already enroll"});   
    }
    else
    {
                    let q1="insert into `myorder` set ?";
                    //execution
                    dbConn.query(q1, form_data, function(err, result) {
                        let q1="SELECT * FROM course";
                        dbConn.query(q1,function(err,result){
                        if(err) {
                            req.flash('error', err);
                            // render to views/users/index.ejs
                            res.render('users/add_order',{data:'',data2:'',msg:''});   
                        } else {
                            // render to views/users/index.ejs
                            let q2="SELECT * FROM student";
                            dbConn.query(q2,function(err,result2){
                                res.render('users/add_order',{data:result,data2:result2,msg:'course enroll sucessfully'});
                                });
                        }
                    });
                    });
                }
});
})
router.get('/order_details/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM myorder where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/order_details',{
                id: '',
                cid: '',
                Title: '',
                link: '',
                data2:''
            });   
        } else {
            // render to views/users/index.ejs
            let q2="SELECT * FROM course";
            dbConn.query(q2,function(err,result2){
                if(err) {
                    req.flash('error', err);
                    // render to views/users/index.ejs
                    res.render('users/order_details',{
                        id: '',
                        cid:'',
                        Title: '',
                        link: '',data2:''});   
                } else {
                    // render to views/users/index.ejs
                    res.render('users/order_details',{
                        id: result[0].id,
                        cid: result[0].cid,
                        Title: result[0].Title,
                        link: result[0].link,data2:result2});
                }
            });
            
        }
    });
});
router.get('/order_edit/(:y)', function(req, res, next) {   
    // render to add.ejs
    let y = req.params.y;
    let q1="SELECT * FROM myorder where `id`="+y;
    dbConn.query(q1,function(err,result){
        if(err) {
            req.flash('error', err);
            // render to views/users/index.ejs
            
            res.render('users/order_edit',{
                id: '',
                cid: '',
                Title: '',
                link: '',
                data2:''
            });   
        } else {
            // render to views/users/index.ejs
            let q2="SELECT * FROM course";
            dbConn.query(q2,function(err,result2){
                if(err) {
                    req.flash('error', err);
                    // render to views/users/index.ejs
                    res.render('users/order_edit',{
                        id: '',
                        cid:'',
                        Title: '',
                        link: '',data2:''});   
                } else {
                    // render to views/users/index.ejs
                    res.render('users/order_edit',{
                        id: result[0].id,
                        cid: result[0].cid,
                        Title: result[0].Title,
                        link: result[0].link,data2:result2});
                }
            });
        }
    });
    
});
router.post('/update_order', function(req, res, next) {  
    //Receive Data
    let id = req.body.id;
    let cid = req.body.cid;
    let Title = req.body.Title;
    let link = req.body.link;
    //store into dictionary
    var form_data = {
        cid: cid,
        Title: Title,
        link:link,
        
    }
    //queries string
    let q1="update `myorder` set ? where `id`="+id;
    //execution
    dbConn.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('users/order_edit',{'id':id})
        }
        else{
            req.flash('success', 'myorder updated successfully');
            res.redirect('/users/all_order');    
        }
    });
});

router.get('/changepwd', function(req, res, next) {    
    // render to add.ejs
    if(!req.session.adm)
    {
        res.redirect('/users/');
    }  
    else
    {
        nm=req.session.adm;
    res.render('users/changepwd',{nm:nm,msg:""});
    }
})

router.post('/changepwd1', function(req, res, next) {  
    //Receive Data
    let adminid = req.body.adminid.trim();
    let opassword = req.body.opassword.trim();
    let npassword = req.body.npassword.trim();
    let cpassword = req.body.cpassword.trim();
    //store into dictionary
    var form_data = {
        password: npassword,
    }
    //queries string
    let q4="SELECT count(*) as count2 FROM admin where `adminid`='"+adminid+"' and `password`='"+opassword+"'";
    dbConn.query(q4,function(err,result4){
    //queries string
        if(result4[0].count2>0)
        {
            if(npassword==cpassword)
            {
                let q1="update `admin` set ? where `adminid`='"+adminid+"'";
                //execution
                dbConn.query(q1, form_data, function(err, result) {
                    if (err) {
                        rnm=req.session.adm;
                        res.render('users/changepwd',{nm:nm,msg:"something went wrong"});
                    }
                    else{
                        nm=req.session.adm;
                        res.render('users/changepwd',{nm:nm,msg:"password updated sucessfully"}); 
                    }
                });
            }
            else
            {
                nm=req.session.adm;
                res.render('users/changepwd',{nm:nm,msg:"both password does not match"});
            }
        } else{
            nm=req.session.adm;
            res.render('users/changepwd',{nm:nm,msg:"old password does not match"});    
        }
    });
})


router.get('/logout', function(req, res, next) {    
    // render to add.ejs
    if(!req.session.adm)
    {
        res.redirect('/users/');
    }  
    else
    {
        req.session.destroy();
        res.redirect('/users/');
    }
})

module.exports = router;