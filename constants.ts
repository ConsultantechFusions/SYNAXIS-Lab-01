import type { Language, LocalizationContent } from './types';

export const TRANSLATION_LANGUAGES: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ur', name: 'Urdu' },
];

export const LOCALIZATION: LocalizationContent = {
    // FileUpload Component
    'drop_files_here': {
        en: 'Drop files here or click to upload',
        ar: 'أسقط الملفات هنا أو انقر للتحميل',
        ur: 'یہاں فائلیں ڈراپ کریں یا اپ لوڈ کرنے کے لیے کلک کریں'
    },
    'supported_formats': {
        en: 'Supported formats: PDF, DOCX, XLSX, CSV, JSON, MD, PNG, JPG',
        ar: 'الصيغ المدعومة: PDF, DOCX, XLSX, CSV, JSON, MD, PNG, JPG',
        ur: 'تعاون یافتہ فارمیٹس: PDF, DOCX, XLSX, CSV, JSON, MD, PNG, JPG'
    },
    'processing_file': {
        en: 'Processing file...',
        ar: 'جاري معالجة الملف...',
        ur: 'فائل پر کارروائی ہو رہی ہے...'
    },
    'file_processed': {
        en: 'File processed. Ask a question below.',
        ar: 'تمت معالجة الملف. اطرح سؤالاً أدناه.',
        ur: 'فائل پر کارروائی ہو گئی۔ نیچے ایک سوال پوچھیں۔'
    },
    // ChatInterface Component
    'type_message': {
        en: 'Type your message or ask for a report...',
        ar: 'اكتب رسالتك أو اطلب تقريرًا...',
        ur: 'اپنا پیغام ٹائپ کریں یا رپورٹ طلب کریں...'
    },
    'send': {
        en: 'Send',
        ar: 'إرسال',
        ur: 'بھیجیں'
    },
    'send_to_chat': {
        en: 'Send to Chat',
        ar: 'إرسال إلى المحادثة',
        ur: 'چیٹ پر بھیجیں'
    },
    'listening': {
        en: 'Listening...',
        ar: 'يستمع...',
        ur: 'سن رہا ہے...'
    },
    'ask_about_file': {
        en: 'Ask a Question about the file',
        ar: 'اطرح سؤالاً عن الملف',
        ur: 'فائل کے بارے میں ایک سوال پوچھیں'
    },
    'generate_on_canvas': {
        en: 'Generate on Canvas',
        ar: 'إنشاء على اللوحة',
        ur: 'کینوس پر بنائیں'
    },
    'export_chat': {
        en: 'Export Chat',
        ar: 'تصدير المحادثة',
        ur: 'چیٹ برآمد کریں'
    },
    // CanvasPanel Component
    'canvas_panel': {
        en: 'Canvas Panel',
        ar: 'لوحة العرض',
        ur: 'کینوس پینل'
    },
    'speak_canvas': {
        en: 'Speak Canvas Content',
        ar: 'نطق محتوى اللوحة',
        ur: 'کینوس کا مواد بولیں'
    },
    'stop_speaking': {
        en: 'Stop Speaking',
        ar: 'إيقاف النطق',
        ur: 'بولنا بند کریں'
    },
    'select_female_voice': {
        en: 'Select Female Voice',
        ar: 'اختر الصوت الأنثوي',
        ur: 'خاتون کی آواز منتخب کریں'
    },
    'select_male_voice': {
        en: 'Select Male Voice',
        ar: 'اختر الصوت الذكوري',
        ur: 'مرد کی آواز منتخب کریں'
    },
    'export_options': {
        en: 'Export Options',
        ar: 'خيارات التصدير',
        ur: 'برآمد کے اختیارات'
    },
    'export_pdf': {
        en: 'Export PDF',
        ar: 'تصدير PDF',
        ur: 'پی ڈی ایف برآمد کریں'
    },
    'export_docx': {
        en: 'Export DOCX',
        ar: 'تصدير DOCX',
        ur: 'ڈاکس برآمد کریں'
    },
    'export_xlsx': {
        en: 'Export XLSX',
        ar: 'تصدير XLSX',
        ur: 'ایکسل برآمد کریں'
    },
    'export_png': {
        en: 'Export PNG',
        ar: 'تصدير PNG',
        ur: 'پی این جی برآمد کریں'
    },
    // Quick Actions
    'quick_actions': {
        en: 'Quick Actions',
        ar: 'إجراءات سريعة',
        ur: 'فوری کارروائیاں'
    },
    'summarize_file': {
        en: 'Summarize File',
        ar: 'تلخيص الملف',
        ur: 'فائل کا خلاصہ'
    },
    'create_mind_map': {
        en: 'Create Mind Map',
        ar: 'إنشاء خريطة ذهنية',
        ur: 'ذہنی نقشہ بنائیں'
    },
    'analyze_data': {
        en: 'Analyze Data & Tables',
        ar: 'تحليل البيانات والجداول',
        ur: 'ڈیٹا اور میزوں کا تجزیہ کریں'
    },
    // Live Transcription Component
    'live_transcription': {
        en: 'Live Transcription',
        ar: 'نسخ حي',
        ur: 'براہ راست نقل'
    },
    'translation_language': {
        en: 'Translation Language',
        ar: 'لغة الترجمة',
        ur: 'ترجمہ کی زبان'
    },
    'original_language': {
        en: 'Original Language',
        ar: 'اللغة الأصلية',
        ur: 'اصل زبان'
    },
    'translating': {
        en: 'Translating...',
        ar: 'جارٍ الترجمة...',
        ur: 'ترجمہ کیا جا رہا ہے...'
    },
};
