  var Bootstrap = (function() {
    var gl_s3_aws_media_url = '';
    var gl_ac_crimes_list = [];
    var special_global_ac_sources_list = [];
    var gl_ac_loc_set = [];
    var gl_ac_loc_ac_set = [];
    var gl_ac_users_list = [];
    var gl_ac_relation_list = [{"key":"P","value":"Parent"},{"key":"S","value":"Sibling"},{"key":"FM","value":"Family member"},{"key":"SPO","value":"Superior officer"},{"key":"SBO","value":"Subordinate officer"}];

  var gl_ac_role_list = [{"key":"K","value":"Killed"},{"key":"T","value":"Tortured"},{"key":"WO","value":"Wounded"},{"key":"D","value":"Detained"},{"key":"KN","value":"Kidnapped"},{"key":"WN","value":"Witness"}];
    
      gl_ac_users_list.push({
        label:"admin",
        id:"1"
      });
    
    //consolidate our init data under one variable
    return {
        gl_s3_aws_media_url: '',
        gl_username: 'admin',
        gl_userid: '1',
        gl_ac_role_list: gl_ac_role_list,
        gl_ac_relation_list: gl_ac_relation_list,
        gl_ac_crimes_list: gl_ac_crimes_list,
        special_global_ac_sources_list: special_global_ac_sources_list,
        gl_ac_loc_set: gl_ac_loc_set,
        gl_ac_loc_ac_set: gl_ac_loc_ac_set,
        gl_ac_users_list: gl_ac_users_list,
        username: 'admin',
        apiKey: 'cabbage'
    };

  }());
