(function (window) {
    var fineUploader = function () {
        return {
             generateModal:function(type,elemArr){
                    var bsCont = document.getElementById(type+"PopupCont");
                    elem1Id="congreaVideoContBody";
                    elem2Id="congreaShareVideoUrlCont";
                    var modal = document.createElement("div");

                    modal.id = type+"Popup";
                    modal.className = "modal";
                    modal.role = "dialog";
                    modal.style.display = "none";
                    modal.setAttribute("tab-index", "-1");
                    modal.setAttribute("area-hidden", "true");
                    bsCont.appendChild(modal);

                    var dialog = document.createElement("div");
                    dialog.className = "modal-dialog";
                    modal.appendChild(dialog);

                    var content = document.createElement("div");
                    content.className = "modal-content";
                    content.id = "videoModalBody"
                    dialog.appendChild(content);

                    var head = document.createElement("div");
                    head.id = "contHead";
                    head.className = "modal-header";
                    content.appendChild(head);

                    var el = document.createElement('button');
                    el.type = "button";
                    el.className = "close";
                    el.id = "modalClose";
                    el.setAttribute("data-dismiss", "modal");

                    el.innerHTML = "&times";
                    head.appendChild(el);

                    var divMain = document.createElement("div");
                    divMain.id = "modalcontBody";
                    divMain.className = "modal-body";
                    content.appendChild(divMain);
                    
                    elemArr.forEach(function(elemId){
                        virtualclass.fineUploader.createElems(divMain,elemId);
                        
                    });
                    
                    var elem = document.createElement("form");
                    elem.id = "form1";
                    content.appendChild(elem);


                    var footer = document.createElement("div");
                    footer.id = "contFooter";
                    footer.className = "modal-footer";
                    content.appendChild(footer);
                    
                    
                    
                },
                createElems:function(divMain,id){
                    var upload = document.createElement("div");
                    upload.id = id;
                    upload.className = "upload";
                    divMain.appendChild(upload);
               },
                
                
                initModal: function (type) {

                        $('#'+type+'Popup').modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                        $('#'+type+'Popup').modal({
                            show: true
                        });

                        $('#'+type+'Popup').on('hidden.bs.modal', function () {
                            //virtualclass.poll.test(type)
                            $('#'+type+'Popup').remove();
                        });
                },
            //endpoint: 'https://uploadmedia.congrea.net',
            //nirmala aws
            uploaderFn: function (obj) {
                var dataObj = {
                    element: obj.wrapper,
                    template: 'qq-template-gallery',
                    debug: true,
                    request: {
                        endpoint: 'https://congrea-master-store.s3.amazonaws.com',

                        accessKey: "AKIAJV7RJOFBDFVY62EQ"
                    },
                    signature: {
                        endpoint: 'https://api.congrea.net/t/upload',
                        version: 4,
                        customHeaders: {
                            'x-api-key': 'yJaR3lEhER3470dI88CMD5s0eCUJRINc2lcjKCu2',
                            'x-congrea-authuser': '46ecba46bc1598c1ec4c',
                            'x-congrea-authpass': '2bf8d3535fdff8a74c01',
                            'x-congrea-room': '12323'
                        }
                    },
                    uploadSuccess: {
                        endpoint: 'https://api.congrea.net/t/uploadSuccess',
                        customHeaders: {
                            'x-api-key': 'yJaR3lEhER3470dI88CMD5s0eCUJRINc2lcjKCu2',
                            'x-congrea-authuser': '46ecba46bc1598c1ec4c',
                            'x-congrea-authpass': '2bf8d3535fdff8a74c01',
                            'x-congrea-room': '12323'
                        }
                    },
                    retry: {
                        enableAuto: false // defaults to false
                    },
                    cors: {
                        allowXdr: true,
                        expected: true,
                        sendCredentials: false
                    },




                    objectProperties: {
                        key: function (id) {
                            var congreaKey = "yJaR3lEhER3470dI88CMD5s0eCUJRINc2lcjKCu2";
                            var congreaRoom = "12323";

                            return congreaKey + '/' + congreaRoom + '/' + this.getUuid(id) + '/' + this.getName(id);
                        }
                    },

                    callbacks: {
                        onComplete: function (id, xhr, rawData) {
                            if(obj.cthis == 'video'){
                                obj.cb.call(virtualclass.videoUl, id, xhr, rawData);
                                var msz = document.querySelector("#videoPopup .qq-upload-list-selector.qq-upload-list");
                                if(msz){
                                    msz.style.display="none";
                                }


                            }else if (obj.cthis == 'docs'){
                                obj.cb.call(virtualclass.dts, id, xhr, rawData);
                            }
                        },
                        onError:function(){


                            var alertMsz= document.querySelector(".dbContainer .alert");
                            if(alertMsz){
                                alertMsz.parentNode.removeChild(alertMsz);
                            }

                            if(obj.cthis == 'video'){
                                var msz = document.querySelector("#videoPopup .qq-upload-list-selector.qq-upload-list");
                                if(msz){
                                    msz.style.display="none";
                                }
                            }else if (obj.cthis == 'docs'){
                                var msz = document.querySelector("#DocumentShareDashboard .qq-upload-list-selector.qq-upload-list");
                                if(msz){
                                    msz.style.display="none";
                                }
                            }

                        }

                    },

                };

                // if(obj.hasOwnProperty('multiple')){
                //     dataObj.multiple = obj.multiple;
                // }

                // if(obj.hasOwnProperty('validation')){
                //     dataObj.allowedExtensions = obj.validation;
                // }

                var galleryUploader= new qq.s3.FineUploader(dataObj)
                console.log(galleryUploader._options.objectProperties.key);
            },

            onDragEnter : function (e){
              var tobeDeactive;
              if(virtualclass.currApp == 'DocumentShare'){
                tobeDeactive = "#listnotes";
                virtualclass.vutil.makeElementActive('#DocumentShareDashboard .qq-uploader-selector.qq-uploader.qq-gallery');
              }else if(virtualclass.currApp == 'Video'){
                tobeDeactive = '#listvideo';
              }
              virtualclass.vutil.makeElementDeactive(tobeDeactive );
              virtualclass.vutil.makeElementActive('#VideoDashboard .qq-uploader-selector.qq-uploader.qq-gallery');
            }
        }
    }();
   window.fineUploader= fineUploader;
})(window);