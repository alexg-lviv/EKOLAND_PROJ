/*
        модуль language_switcher_c
        v 1.0
        Oleg N. Ryabov 2013, helgisbox@mail.ru
 */
 
        var language_switcher_c = (function () {

        // здесь указываем параметры работы
        // id контрола, на который вешается событие
                var switcher_name = "id-btn_switch";
        // control caption RU
                var switcher_caption_RU = "Switch to english";
                var switcher_imageURL_RU = "assets/img/en2.png";
                //var switcher_imageURL_RU = "assets/js/r0500.jpg";
        // control caption EN
                var switcher_caption_EN = "Переключить на русский";
                var switcher_imageURL_EN = "assets/img/rus2.png";
                //var switcher_imageURL_EN = "assets/js/r5000.jpg";

        // id элемента-контейнера с английским текстом
                var container_eng_name = "en";
        // id элемента-контейнера с русским текстом
                var container_rus_name = "ru";
                
        // другие переменные
        // статус по умолчанию
                var cur_state = "state_ru";

                function switch2ru()
                {
                        cur_state = "state_ru";
                        apply_view();
                };

                function switch2en()
                {
                        cur_state = "state_en";
                        apply_view();
                };
                
                function change_hidden_state(ch_name, bl_state)
                {
                        if (document.getElementsByClassName(ch_name))
                        {
                                for (i=0; i<document.getElementsByClassName(ch_name).length; i++)
                                {
                                        document.getElementsByClassName(ch_name)[i].hidden = bl_state;
                                        document.getElementsByClassName(ch_name)[i].style.display = bl_state;
                                        document.getElementsByClassName(ch_name)[i].hidden = "link";
                                        document.getElementsByClassName(ch_name)[i].style.display = "link";
                                        
                                }
                        }
                }
                
                function apply_view()
                {
                        if (cur_state == "state_en")
                        {
                                change_hidden_state(container_rus_name, "none");
                                change_hidden_state(container_eng_name, "block");
                                document.getElementById(switcher_name).value = switcher_caption_EN;
                                if (document.getElementById(switcher_name).src) 
                                {
                                        document.getElementById(switcher_name).src=switcher_imageURL_EN;

                                }
                        }else{
                                change_hidden_state(container_rus_name, "block");
                                change_hidden_state(container_eng_name, "none");
                                document.getElementById(switcher_name).value = switcher_caption_RU;
                                if (document.getElementById(switcher_name).src) 
                                {
                                        document.getElementById(switcher_name).src=switcher_imageURL_RU;

                                }
                        }
                };
                        
                function switch_language()
                {
                        if (cur_state == "state_ru") 
                        {
                                switch2en();
                        }else{
                                switch2ru();
                        }
                };
                
                
                function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure )
                {
                        var cookie_string = name + "=" + escape ( value );
                        if ( exp_y )
                        {
                                var expires = new Date ( exp_y, exp_m, exp_d );
                                cookie_string += "; expires=" + expires.toGMTString();
                        }
                        if ( path ) 
                        {
                                cookie_string += "; path=" + escape ( path );
                        }
                        if ( domain )
                        {
                                cookie_string += "; domain=" + escape ( domain );
                        }
                        if ( secure )
                        {
                                cookie_string += "; secure";
                        }
                        document.cookie = cookie_string;
                }               
                
                function get_cookie ( cookie_name )
                {
                        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
                        if ( results )
                        {
                                return ( unescape ( results[2] ) );
                        }else{
                                return null;
                        }
                }
                
                function get_browser_language()
                {
                        if (window.navigator.language)
                        {
                                if (window.navigator.language == "en") 
                                {
                                        cur_state = "state_en";
                                }else{
                                        cur_state = "state_ru";
                                }
                        }
                }
                
                function load_current_state()
                {
                        // HTML4
                        cur_state = get_cookie ("language_state_local");
                        if (!cur_state) {get_browser_language();}
                        // HTML5
                        /*
                        if (localStorage.getItem('language_state_local'))
                        {
                                cur_state = localStorage.getItem('language_state_local');
                        }
                        */
                        // trace only mode
                        if (document.getElementById('id-language_state_local-caption'))
                        {
                                document.getElementById('id-language_state_local-caption').innerHTML = cur_state;
                        }
                };

                function save_current_state()
                {
                        // HTML4
                        set_cookie ("language_state_local", cur_state, 2030, 1, 1, null, null, null);
                        // HTML5 only
                        /*
                        localStorage.setItem('language_state_local', cur_state);
                        */
                        // trace info
                        if (document.getElementById('id-language_state_local-caption'))
                        {
                                document.getElementById('id-language_state_local-caption').innerHTML = cur_state;
                        }
                };

                return {
                        fswitch: function() 
                        {
                                switch_language();
                                save_current_state();
                        },

                        fapply: function() 
                        {
                                load_current_state();
                                apply_view();
                        }
                }
        })();

        
        // определение оберточных обработчиков событий
        // для переключения ракладки
        function make_language_switch()
        {
                var lswitch = language_switcher_c;
                lswitch.fswitch();
        };

        // для применения сохраненных сведений
        function make_language_apply()
        {
                var lswitch = language_switcher_c;
                lswitch.fapply();
        };
