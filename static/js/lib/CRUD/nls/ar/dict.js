// standard strings for header.js view
define({
  'actor': {
    'condition': 'الحالة',
    'aka': 'الملقب',
    'works_as_a_en': 'يعمل ك (EN)',
    'works_as_a_ar': 'يعمل في العربية',
    'involved': 'متورط',
    'position_en':'موقف (EN)',
    'position_ar': 'موقف في العربية',
      'involved_in_incident': {
        'single': 'مشارك في <span class="incident-count"> ملف واحد</span>',
        'plural': 'مشارك في <span class="incident-count"> <%=num %> ملفات</span>',
      },
    'lives_in': 'يعيش في <%=location %>',
    'Mentioned_in': 'مذكور في',
    'Born_in': 'مولود في',
    'Add_as': 'إضافة ك',
    'Related_as': 'مرتبط ك',
    'Related_Actors': 'الأشخاص المرتبطين',
    'Date_Of_Birth': 'تاريخ الميلاد',
    'Nationality': 'الجنسية',
    'Nationality_en': 'الجنسية(en)',
    'Nationality_ar': 'الجنسية(ar)',
    'Ethnicity': 'العرق',
    'Ethnicity_en': 'العرق(en)',
    'Ethnicity_ar': 'العرق(ar)',
    'Occupation': 'المهنة',
    'Speaks': 'المتحدثون',
    'Religion': 'الدين',
    'Remove': 'إزالة',
    'Actors': 'أشخاص',
    'Actor_Image': 'صورة الشخص',
    'Incidents': 'ملفات',
    'Bulletins': 'مواد',
    'Name_must_be_entered': 'يجب إدخال الإسم',
    'Name': 'الإسم',
    'Nickname': 'اللقب',
    'Sex': 'الجنس',
    'Age': 'السن',
    'Place_Of_Birth':'مكان الميلاد',
    'Current_Location' : 'الموقع الحالي',
    'Male': 'ذكر',
    'Female': 'إنثى',
    'Adult': 'بالغ',
    'Child': 'طفل',
    'ChildAdult': 'بالغ\\طفل',
    'CivilianNoncivilian': 'مدني\\غير مدني',
    'Civilian': 'مدني',
    'Noncivilian': 'غير مدني',
    'Police': 'شرطة',
    'Position_rank': 'المنصب أو الرتبة',
    'Spoken_dialects': 'اللهجات المحكية',
    'Select_a_status_for_this_actor': 'اختر حالة الشخص',
    'Select_status': 'اختر الحالة',
    'Status': 'الحالة',
    'Comment_field_is_required': 'حقل التعليق مطلوب',
    'Comment': 'تعليق'
  },
  'bulletin': {
    'in': 'في',
    'actors_involved': {
      'single': '<span class="actors-count">1</span> أشخاص مشاركين',
      'plural': '<span class="actors-count"><%=num %></span> أشخاص مشاركين',
    },
    'update_status': 'تحديث الحالة',
    'unassigned': 'غيرمفرز',
    'Relate': 'مرتبط',
    'Related_bulletins': 'المواد المرتبطة',
    'Remove': 'إزالة',
    'Title_field_is_required': 'حقل العنوان مطلوب',
    'Title': 'العنوان',
    'Score': 'الموثوقية',
    'Description': 'التفاصيل',
    'Assigned_to': 'تحت مسؤولية',
    'Select_a_status_for_this_bulletin': 'اختر حالة لهذة المادة',
    'Select_Status': 'اختر الحالة',
    'Comment_field_is_required': 'حقل التعليق مطلوب',
    'Comment': 'سبب التحديث',
    'close': 'إغلاق',

    'Status': 'الحالة',
    'Sources': 'المصادر',
    'Labels': 'التصنيفات',
    'Locations': 'المواقع',
    'Related_Media': 'المواد المرتبطة'
  },
  'incident': {
    'Crime': 'النوع',
    'Assigned_to': 'تحت مسؤولية',
    'Related_incidents': 'الملفات المرتبطة',
    'Relate': 'مرتبط',
    'Remove': 'إزالة',
    'Title_field_is_required': 'حقل العنوان مطلوب',
    'Title': 'العنوان',
    'close': 'إغلاق',
    'Reliability_Score': 'الموثوقيه',
    'in': 'في',
    'Description': 'التفاصيل',
    'Confidence':'الموثوقيه',
    'Unassigned': 'غيرمفرز',
    'Locations': 'المواقع',
    'Labels': 'التصنيفات',
    'Select_a_status_for_this_incident': 'اختر حالة لهذا الملف',
    'Select_status': 'اختر الحالة',
    'Status': 'الحالة',
    'You_must_supply_a_reason_for_the_edit': 'الرجاء كتابة تعليق عن سبب هذا التعديل',
    'Reason_For_Update': 'سبب التحديث',
  },
  'event': {
    'Events': 'الأحداث',
    'from': 'من',
    'to': 'إلى',
    'Remove': 'إزالة',
    'Description': 'التفاصيل',
    'Comment': 'تعليق',
    'Reliability_score': 'الموثوقيه',
    'Save_Event': 'حفظ الحدث',
  },
  'media': {
    'media': 'مادة',
    'document': 'ملف',
    'video': 'فيديو',
    'Upload_Failed_Problem_contacting_server': 'التحميل قد فشل — مشكلة في التواصل مع الموقع',
    'Upload_new_media': 'تحميل مادة جديدة',
    'No_file_attached': 'لا يوجد ملف',
    'Media_uploaded_successfully': 'تم تحميل المادة بنجاح',
    'file_label': 'اسم الملف',
    'file_type': 'نوع الملف',
    'Remove': 'إزالة',
    'Relate': 'مرتبط',
    'file_upload': 'تحميل ملف',
    'upload_media': 'تحميل المادة',
    'cancel': 'إلغاء'
  },
  'comment': {
    'Comment': 'تعليق',
    'Comments': 'التعليق',
    'Remove': 'إزالة',
    'by': 'من قبل',
    'Select_Status': 'اختر الحالة',
    'Status': 'الحالة',
    'Save_comment': 'حفظ التعليق'
  },
  'revision': {
    'REVISIONS': 'نتقيحات',
    'show_revision_list': 'إظهار قائمة التنقيحات',
  },
  'dialog': {
    'Any_changes_you_have_made_on_the_form_will_be_lost_Are_you_sure':'سيتم فقدان أي تغييرات أجريتها هنا. هل أنت متأكد؟',
      'Close': 'إغلاق',
      'Cancel': 'إلغاء الأمر',
      'Confirm': 'تأكيد',
      'Close_edit_form': 'أغلق استمارة التعديل',
      'Preview_add_actor': 'عرض مسبق للشخص',
      'Preview_add_bulletin': 'عرض مسبق للمواد'
  },
  'Hide': 'إخفاء',
  'Search': 'بحث',
  'Collapse': 'طي',
  'Expand': 'توسيع',
  'selected': 'محدد',
  'Select': 'تحديد',
  'Edit': 'تعديل',
  'Save': 'حفظ',
  'unselected': 'غير محدد',
  'Entity_not_found': '<%=entity %> غير موجود'
});
