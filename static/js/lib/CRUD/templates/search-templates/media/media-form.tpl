<div class="Application" lang="en">
  <div class="message-text">
    <p class="server fail message">{{i18n.media.Upload_Failed_Problem_contacting_server}}</p>
    <p class="file fail message">{{i18n.media.No_file_attached}}</p>
    <p class="success message"> {{i18n.media.Media_uploaded_successfully}} </p>
  </div>
  <div class="media-progressbar"></div>
  <form 
    method="post"
    class="media-form">
    <!--enctype="multipart/form-data"-->
    <div class="field">
      <label>{{i18n.media.file_label}}</label>
      <div class="i18n with-en with-ar">
        <div lang="en">
          <input type="text" name="name_en"
            value="" class="{{entityType}}-field w-100p" />
        </div>
        <!--
        <div lang="ar">
          <input type="text" name="name_ar" id="fullname_ar"
          value="" class="{{entityType}}-field w-100p" />
        </div>
        <span class="toggle">
          <span lang="en">EN</span><span lang="ar">AR</span>
        </span>
        -->
      </div>
    </div>
    <!--<div class="field">-->
      <!--<label>{{i18n.media.file_type}}</label>-->
      <!--<select name="media_type" id="{{entityType}}-media_type"-->
        <!--class="{{entityType}}-field">-->
        <!--{{#each mediaTypes}}-->
        <!--<option value="{{value}}">{{text}}</option>-->
        <!--{{/each}}-->
      <!--</select>-->
    <!--</div>-->
    <div class="field">
      <label>{{i18n.media.file_upload}}</label>
      <input id="{{entityType}}-file-upload"
        name="media_file" type="file" 
        class="{{entityType}}-field" />
      <input type="submit" value="Attach File Details"  class="hidden" />
    </div>
  </form>
</div>
