/* Freedom Policy Center — prototype data + view logic.
   Three primary menus are built out: Dashboard, Policy & Form Library, Table of Contents. */

const POLICIES = [{"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1000", "title": "INQUIRIES REFERRALS TRIAGE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1001", "title": "PRESCREENING FOR ADMISSION", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1002", "title": "ADMISSION CRITERIA", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1003", "title": "PSYCHOSOCIAL ASSESSMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1004", "title": "EXCLUSIONARY CRITERIA", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1005", "title": "PSYCHIATRIC EVALUATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1006", "title": "ASSESSMENT AND REASSESSMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1007", "title": "MIA MULTIDISCIPLINARY INTEGRATED ASSESSMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1008", "title": "VOLUNTARY ADMISSION", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1009", "title": "SAFE-T PROTOCOL WITH C-SSRS SUICIDE RISK ASSESSMENT", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1010", "title": "HOMICIDE VIOLENCE AGGRESSION ASSESSMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1011", "title": "AIMS ABNORMAL INVOLUNTARY MOVEMENTS SCALE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1012", "title": "PAIN ASSESSMENT AND PAIN SCALE", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1013", "title": "AT RISK FOR FALLS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1014", "title": "FOLSTEIN MINI-MENTAL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1015", "title": "NEUROLOGICAL ASSESSMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1016", "title": "NURSING ASSESSMENT MIA", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1017", "title": "SKIN AND BRADEN SCALE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1018", "title": "SAFETY PRECAUTIONS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1019", "title": "CRITICAL CARE ASSESSMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1020", "title": "ADMISSION ASSESSMENT CLOSE OBSERVATION", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1021", "title": "NUTRITIONAL ASSESSMENT AND REASSESSMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1022", "title": "DO NOT RESUSCITATE (DNR)", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1023", "title": "ADVANCED DIRECTIVES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1024", "title": "PATIENT AND FAMILY EDUCATION", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1025", "title": "MEDICAL HISTORY AND PHYSICAL EXAMINATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1026", "title": "MTI MULTITREATMENT INTEGRATION", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1027", "title": "REFERRAL FLOWCHART", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1028", "title": "INTERDEPARTMENTAL COMMUNICATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1029", "title": "INSURANCE PRE-CERTIFICATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1030", "title": "MEDICAL CLEARANCE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1031", "title": "BLEEDING PRECAUTIONS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ADMISSION ASSESSMENT MANAGEMENT", "policy": "1032", "title": "PNEUMOCOCCAL AND INFLUENZA VACCINE PROTOCOLS SCREENINGS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2000", "title": "DISCHARGE PLANNING", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2001", "title": "MEDICAL NECESSITY CRITERIA", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2002", "title": "CONCURRENT REVIEW", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2003", "title": "PATIENT DAY DETERMINATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2004", "title": "VARIANCE DECISION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2005", "title": "INITIAL REVIEW", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2006", "title": "PHYSICIAN CERTIFICATION STATEMENT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2007", "title": "PSYCHOLOGICAL TESTING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2008", "title": "SECONDARY REVIEW", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2009", "title": "PATIENT SUMMATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2010", "title": "DAILY UR MEETINGS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2011", "title": "DISCHARGE RECEIVING ACKNOWLEDGEMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2012", "title": "PATIENT DISCHARGE PROCESS", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2013", "title": "DIRECT PATIENT TRANSFER", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2014", "title": "DISCHARGE DIETARY EDUCATION", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2015", "title": "DISCHARGE MEDICATION EDUCATION", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2016", "title": "NURSING DISCHARGE PROCESS", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2017", "title": "DISCHARGE CONTINUING CARE PLAN", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "CASE MANAGEMENT", "policy": "2018", "title": "SAFETY PLAN", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIAGNOSTIC MANAGEMENT", "policy": "3001", "title": "RELEASE OF RECORDS AND RESULTS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIAGNOSTIC MANAGEMENT", "policy": "3002", "title": "RADIOLOGY SERVICES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIAGNOSTIC MANAGEMENT", "policy": "3003", "title": "ORDERING DIAGNOSTICS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4001", "title": "PURPOSE OF THE FOOD SERVICE DEPARTMENT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4002", "title": "CALL BACK TRAYS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4003", "title": "LATE ADMISSIONS", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4004", "title": "STANDARD PRECAUTIONS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4005", "title": "BULK NOURISHMENTS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4006", "title": "NOURISHMENT CONTROL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4007", "title": "SHELF LIFE AND EXPIRATIONS DATES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4008", "title": "DIET ORDER", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4009", "title": "WRITTEN DIET ORDERS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4010", "title": "RECEIVING PROCESSING DIET ORDERS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4011", "title": "NUTRITIONAL CARE PROCESS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4012", "title": "IDENTIFICATIONS AND DEFINITION OF NUTRITIONAL STATUS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4013", "title": "NUTRITIONAL SCREENINGS AND ASSESSMENTS", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4014", "title": "PROFESSIONAL STANDARD REVIEW", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4015", "title": "MONITORING OF PLAN FOR NUTRITION THERAPY REASSESSMENTS", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4016", "title": "NUTRITIONAL CARE MANUAL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4017", "title": "NUTRITIONAL ASSESSMENT AND REASSESSMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4018", "title": "INPATIENT EDUCATION AND COUNSELING", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4019", "title": "DISCHARGE COUNSELING", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4020", "title": "DIETARY CLEANING", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4021", "title": "MEAL SERVING TIMES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4022", "title": "PEST CONTROL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4023", "title": "TEMPERATURE LOG", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4024", "title": "PERSONNEL AND INFECTION CONTROL", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4025", "title": "HAND WASHING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4026", "title": "SANITATION SURVEY", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4027", "title": "DOCUMENTING IN THE PATIENT MEDICAL CHART", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4028", "title": "NPO CLEAR LIQUID", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4029", "title": "FOOD AND DRUG INTERACTION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4030", "title": "PURCHASE SYSTEM", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4031", "title": "FOOD STORAGE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4032", "title": "TRAY IDENTIFICATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "DIETARY MANAGEMENT", "policy": "4033", "title": "FOOD STORAGE AND TEMPERATURE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6000", "title": "MEDICAL EQUIPMENT MANAGEMENT PLAN", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6001", "title": "UTILITY SYSTEMS MANAGEMENT PLAN", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6002", "title": "CONTRABAND AND RESTRICTED ARTICLES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6003", "title": "GENERAL CLEANING AND DISINFECTION", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6004", "title": "ELOPEMENT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6005", "title": "FIREARMS PROHIBITION", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6006", "title": "GENERAL SAFETY INFORMATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6007", "title": "VISTOR RULES AND REGULATIONS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6008", "title": "LAUNDRY AND LINEN", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6009", "title": "COMPRESED GAS AND OXYGEN USE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6010", "title": "STORAGE OF FLAMMABLES AND COMBUSTIBLES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6011", "title": "CLEANING OUTSIDE OF DRYERS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6012", "title": "CLEANING INSIDE OF WASHER AND DRYERS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6013", "title": "CAMERAS AND RECORDING EQUIPMENT USE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6014", "title": "CLOTHING BELONGING TO PATIENTS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6015", "title": "CONDUCT TO MINIMIZE VIOLENCE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6016", "title": "METAL DETECTOR USE IN SEARCHES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6017", "title": "ELECTRICAL SAFETY", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6018", "title": "INVENTORY AND INSPECTION OF NEW EQUIPMENT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6019", "title": "SSTORAGE OF LAUNDRY SUPPLIES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6020", "title": "EMPLOYEE SAFETY ORIENTATIOIN", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6021", "title": "NUTRITION CARE MANUAL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6022", "title": "PEST CONTROL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6023", "title": "GROUNDS SAFETY", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6024", "title": "FRIE RESPONSE PLAN", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6025", "title": "EMERGENCY EYE WASH STATIONS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6026", "title": "AUTHORITY", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6027", "title": "SMOKING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6028", "title": "ANIMAL VISITATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6029", "title": "VISITORS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "ENVIRONMENT OF CARE", "policy": "6030", "title": "VISITOR SAFETY", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5001", "title": "STAFF TRAINING", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5002", "title": "HOSPITAL WIDE - HUMAN RESOURCES - KEY CONTROL/ACCESS CONTROL CARDS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5003", "title": "MEDICAL RECORDS SECURITY DURING EVACUATION PROCEDURES", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5004", "title": "PATIENT CHARTS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5005", "title": "EMERGENCY WATER SUPPLY", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5006", "title": "DISCLOSURE OF PROTECTED HEALTH INFORMATION DURING DISASTER RELIEF", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5007", "title": "STANDADIZING EMERGENCY CODES AND ALERTS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5008", "title": "HOSPITAL WIDE - EMERGENCY MANAGEMENT PLAN - DRILLS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5009", "title": "SUPPLIES, UTILITIES, EQUIPMENT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5010", "title": "SEVERE WINTER STORMS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5011", "title": "HAZARD COMMUNICATION PROGRAM", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5012", "title": "WORKPLACE VIOLENCE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5013", "title": "SECURE RECORD TRANSPORT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5014", "title": "BOMB THREAT", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5015", "title": "HURRICANES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5016", "title": "DISASTER PLANS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5017", "title": "LABOR POOL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5018", "title": "EMERGENCY LIGHTING AND POWER", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5019", "title": "TORNADO WATCH - WARNING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5020", "title": "CODE BLUE - MEDICAL EMERGENCIES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "EMERGENCY MANAGEMENT", "policy": "5021", "title": "RISK ASSESSMENT PROGRAM", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "HIM", "policy": "17000", "title": "Development, Access and Maintenance of the Electronic Health Record", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HIM", "policy": "17001", "title": "Acceptable Medical Abbreviations", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17003", "title": "Discharge Summary", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "HIM", "policy": "17004", "title": "Confidentiality and Security Protected Health Information", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "HIM", "policy": "17005", "title": "Fax Transmittal Sheet", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17006", "title": "Filing System", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17007", "title": "Uses and Disclosures of Protected Health Information - General Rules", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17008", "title": "Initial Appointment Process Checklist", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17009", "title": "Legibility of Medical Records Documentation", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17010", "title": "Medical Record Content Policy", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17011", "title": "Re-Appointment Process Checklist", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17012", "title": "Registered Health Information Administrator (RHIA)", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17013", "title": "Release of Medical Information", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17014", "title": "Temporary Privileges", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17015", "title": "The Privileging Process", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17016", "title": "Transcription", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17017", "title": "Electronic Signatures", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17018", "title": "HIPAA Sanction Policy", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "HIM", "policy": "17019", "title": "Password Management Guidelines", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HIM", "policy": "17020", "title": "Master Patient Index", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7000", "title": "NEW HIRE PAPERWORK", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7001", "title": "APPLICATION PROCESS", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7002", "title": "POSITION COMPETENCIES", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7003", "title": "QUALIFICATIONS AND JOB DESCRIPTIONS", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7004", "title": "NEW EMPLOYEE ORIENTATION", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7005", "title": "CORRECTIVE ACTION REPORTS", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7006", "title": "DISCIPLINARY ACTION", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7007", "title": "BEHAVIORAL UNIT ORIENTATION", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7008", "title": "ANNUAL ORIENTATION", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7009", "title": "ORGANIZATION AND STAFFING", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7010", "title": "TRAINING AND DEVELOPMENT", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7011", "title": "LICENSURE, CERTIFICATION, REGISTRATION", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7012", "title": "FEDERAL EXCLUSIONARY SCREENING", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7013", "title": "PRE-EMPLOYMENT AND ANNUAL HEALTH SCREENING", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7014", "title": "SERVICES CONTRACTORS", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7015", "title": "BACKGROUND SCREENING", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7016", "title": "HR MANAGEMENT SOFTWARE", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7017", "title": "EMPLOYEE GRIEVANCE POLICY", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "HUMAN RESOURCES", "policy": "7018", "title": "ABUSE AND NEGLECT", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8001", "title": "ADMINISTERING AND READING PPD TEST", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8002", "title": "EMERGENCY MANAGEMENT PLAN - INFLUX OF INFECTIOUS DISEASES", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8003", "title": "EMPLOYEE INFECTIOIN CONTROL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8004", "title": "STATE SPECIFIC HEALTH SCREEN", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8005", "title": "ALCOHOL-BASED HAND RUB (ABHR)-GEL (PLACEMENT AND PERMISSIBLE VOLUMES)", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8006", "title": "PRE-EMPLOYMENT AND ANNUALL HEALTH SCREENING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8007", "title": "EMPLOYEE EXPOSURE TO COMMUNICABLE DISEASE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8008", "title": "PATEINT AND FAMILY EDUCTION AND VISITATION MANAGEMENT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8009", "title": "EMPLOYEE HEALTH PROGRAM", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8010", "title": "HAND WASHING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8011", "title": "PREVENTION CONTROL AND MONITORING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8012", "title": "SPEDIMEN COLLECTIOIN", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8013", "title": "LINENS AND SANITATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8014", "title": "BASIC DISINFECTION", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8015", "title": "REFRIGERATOR TEMPERATURE MONITORING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "INFECTION CONTROL", "policy": "8016", "title": "COVID-19 DEFINITION BACKGROUND AND CDC GUIDANCE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9001", "title": "ADMINISTRATIVE ON CALL (AOC)", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9002", "title": "ANNUAL BUDGET", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9003", "title": "AUTHORITY IN ABSENCE OF ADMINISTRATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9004", "title": "AVAILABLITY OF MEDICAL STAFF", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9005", "title": "CHAIN OF COMMAND, DELEGATION OF AUTHORITY, ADMIN ON CALL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9006", "title": "CONTRACT SERVICE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9007", "title": "PHYSIICAN COVERAGE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9008", "title": "GENERAL STAFFING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9009", "title": "ROOM SEARCHES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9010", "title": "MEDICAL CONSULTATIONS, MEDICAL CONSULTING INTERN VISITS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9011", "title": "MEICAL HISTORY AND PHYSICAL EXAMINATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9012", "title": "ROOM CHECKS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9013", "title": "MEDICAL STAFF REAPPOINTMENT AND RENEWAL OF PRIVILEGES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9014", "title": "SENTINEL EVENT", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9015", "title": "PATIENT HANDBOOK", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9016", "title": "PHARMACY AND THERAPEUTICS COMMITTEE", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9017", "title": "PSYCHIATRIC SERVCES DIRECTOR - RESPONSIBILITIES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9018", "title": "PSYCHIATRIC NURSING SERVICES DIRECTOR", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9019", "title": "EXTERNAL EMPLOYMENT REPORTING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9020", "title": "DEVELOPMENT AND REVIEW OF CLINICAL GUIDELINES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9021", "title": "STAFFING EFFECTIVENESS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LEADERSHIP MANAGEMENT", "policy": "9022", "title": "ORGANIZED MEDICAL STAFF", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10000", "title": "LIFE SAFETY MANAGEMENT PLAN", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10001", "title": "BUILDING AND FIRE PROTECTION FEATURES", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10002", "title": "FIRE ALARM SYSTEM TESTING AND INSPECTION", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10003", "title": "FIRE DRILL POLICY", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10004", "title": "USE OF A FIRE EXTINGUISHER", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10005", "title": "SPRINKLER HEADS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10006", "title": "SPRINKLER DROP TEST", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10007", "title": "SMOKE DETECTOR - INSPECTION PROCEDURES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10008", "title": "LOCATION OF FIRE EXTINGUISHERS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10009", "title": "FIRE SAFETY - HAZARDS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10010", "title": "FIRE SAFETY - SMOKING POLICY", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10011", "title": "INTERIM LIFE SAFETY MEASURES POLICY", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10012", "title": "FIRE ALARM SYSTEM - MONITORING AND TESTING", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10013", "title": "FIRE DOOR INSPECTION", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10014", "title": "FIRE ALARM PULL SAFETY TEST", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10015", "title": "FIRE SAFETY - MATERIALS OR EQUIPMENT PURCHASES", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10016", "title": "STORAGE OF FLAMMABLES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10017", "title": "TRANSMISSION OF FIRE ALARMS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10018", "title": "TESTING OF EMERGENCY GENERATORS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10019", "title": "WHISTLE ALERT - URGENT COMMUNICATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "LIFE SAFETY", "policy": "10020", "title": "FIRE SAFETY - CHAIN OF COMMAND - ROLES AND RESPONSIBILITIES", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11001", "title": "MEDICATION ADMINISTRATION", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11002", "title": "VERBAL AND WRITTEN ORDERS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11003", "title": "ADVERSE DRUG REACTIOIN REPORTING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11004", "title": "MEDICATION VARIANCE", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11005", "title": "AUTOMATIC STOP ORDERS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11006", "title": "ADM REMOVING MEDICATIONS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11007", "title": "GENERAL AUTOMATED DISPENSING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11008", "title": "ADM AUDIT AND QUALITY CONTROL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11009", "title": "ADM NARCOTICS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11010", "title": "PHARMACY DEPARTMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11011", "title": "PHARMACY ORGANIZATIONAL CHART", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11012", "title": "ADM POLICIES & PROCEDURES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11013", "title": "ADM STOCK MEDICATION", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11014", "title": "ADM CONTROLLED SUBSTANCES", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11015", "title": "ADM EMERGENCY STAT MEDICATION ORDERS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11016", "title": "ADM PHARMACIST ORDER VERIFICATION AND DRUG DISTRIBUTION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11017", "title": "PROVISION OF PHARMACEUTICAL SERVICES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11018", "title": "ADM PREVENTATIVE MAINTENANCE", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11019", "title": "ADM MALFUNCTONS DOWNTIME", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11020", "title": "ADM CLOSURE OF A PATIENT CARE UNIT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11021", "title": "DISPOSITION OF PHARMACY RECORDS", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11022", "title": "MEDICATION INADVERTENT INCIDNET REPORT", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11023", "title": "LOOK ALIKE SOUND ALIKE MEDICATION MANAGEMENT", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11024", "title": "WARFARIN THERAPY-INTERNATIONAL NORMALIZED RATIO (INR)", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11025", "title": "ADM ACESS TO", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11026", "title": "PHARMACY AND THERAPEUTICS COMMITTEE", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11027", "title": "FORMULARY", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11028", "title": "RENEWABLE DRUGS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11029", "title": "GENERAL STATEMENTS ON MEDICATIONS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11030", "title": "MEDICATION ROOM", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11031", "title": "DISPENSING AND CONTROLLING MEDICATIONS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11032", "title": "PHARMACY PROCEDURE IN CASE OF COMPUTER FAILURE", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11033", "title": "ACCESS TO PHARMACY AFTER NORMAL HOURS", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11034", "title": "DISPENSING AND CONTROLLING EMERGENCY DRUGS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11035", "title": "FLOOR STOCK MEDICATIONS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11036", "title": "DISPOSITION OF EXPIRED-UNUSABLE DRUGS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11039", "title": "REPORTING OF ADVERSE DRUG REACTIONS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11040", "title": "CONTROLLED SUBSTANCES (GENERAL)", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11041", "title": "DISPOSITON OF CONTROLLED SUBSTANCES", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11042", "title": "PROCURING DRUGS - ROUTINE BASIS & EMERGENCIES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11043", "title": "OMNICELL USERS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11044", "title": "PROPER USAGE OF OMNICELLS & FLOOR STOCK", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "MEDICATION MANAGEMENT", "policy": "11045", "title": "RETRIEVAL PROCESS FOR RECALLED OR DISCONTINUED MEDICATIONS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13001", "title": "MASTER TREATMENT PLAN, TREATMENT TEAM, TREATMENT PLAN UPDATES", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13002", "title": "CARE PLANNING AND SPECIAL PROCEDURES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13003", "title": "MASTER PROBLEM LIST", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13004", "title": "PATIENT PHOTOS FOR IDENTIFICATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13005", "title": "PSYCHOLOGICAL CONSULTATIONS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13006", "title": "CLINICAL SERVICES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13007", "title": "PRELIMINARY PLAN OF CARE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13008", "title": "ACTIVITY THERAPY", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13009", "title": "PSYCHIATRIC NURSING CARE", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13010", "title": "PROGRRESS RECORDING AND TIMELINESS OF REQUIREED CLINICAL TASK COCUMENTATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13011", "title": "INDIVIDUAL GROUP, FAMILY THERAPY, AND FAMILY CONTACT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13012", "title": "PERSONAL HYGIENE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13013", "title": "ORIENTATIOIN AND MONTIROING OF THE NEW PATIENT AND MONITORING OF DINING, COMMON, GROUP AREAS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13014", "title": "PATIENT MEDICATION INFORMATION RECONCILIATIOINS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13015", "title": "PATIENT VALUABLES AND BELONGINGS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13016", "title": "ROOM ASSIGNMENTS AND RESPONSIBILITIES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13017", "title": "SAFETY PRECAUTIONS AND ROUNDS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13018", "title": "SUICIDE PRECAUTIOINS", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13019", "title": "ABUSE AND NEGLECT", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13020", "title": "BLOOD GLUCOSES MONITORING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13021", "title": "TELEMEDICINE ACCESS SERENITY", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13022", "title": "EDUCATIONS, PROFESSIOINAL STAFF, STAFF, PATIENT, PATIENTS FAMILY, LEGALLY RESPONSIBLE PERSON", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13023", "title": "MANAGEMENT OF THE COMBATIVE AND ASSAULTIVE PATIENTS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13024", "title": "STANDARDS FOR REFERRALS, REFERRALS SOURCES, AND SONSULTS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13025", "title": "PROVISIONS OF MEDICAL EMERGENCY SERVICE", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13026", "title": "MEDICAL EMERGENCIES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13027", "title": "CHANGE IN CONDITION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13028", "title": "GUIDELINES FOR PATIENT VISITATION AND VISITATION POST DISCHARGE", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13029", "title": "EMERGENCY CRASH CART", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13030", "title": "EMERGENCY USE OF RESTRAINT AND SECLUSION, STAFF ORIENTATION AND TRAINING FOR RESTRAINT AND SECLUSION", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13031", "title": "CARDIOPULMONARY RESUSCITATION PROCESS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13032", "title": "DEFBRILATOR CHECK", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13033", "title": "UNFAVORABLE - AMA DISCHARGES AGAINST MEDICAL ADVICE", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13034", "title": "READMISSIONS WITHIN 30 DAYS - CONTINUE STAY WITHIN 72 HOURS", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13035", "title": "CRITICAL VALUES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13036", "title": "SEIZURES - NURSING MANAGEMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13037", "title": "PHYSICIAN SURROUNDINGS AND STAFF - TELEMEDICINE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13038", "title": "POST MORTEM CARE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13039", "title": "DEATH OF PATIENT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13040", "title": "PROVIDER TO PROVIDER COMMUNICATION TELEMEDICINE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13041", "title": "PRESCRIBING AND MEDICATION MANAGEMENT - TELEMEDICINE", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13042", "title": "PATIENT CONSENT - TELEMEDICINE", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PROVISION OF CARE", "policy": "13043", "title": "TELEMEDICINE PROCEDURE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15000", "title": "CARE DECISIONS-INFORMED CONSENT-SURROGATE DECISION", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15001", "title": "VOLUNTARY ADMISSION", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15002", "title": "INVOLUNTARY ADMISSION", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15003", "title": "INFORMED CONSENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15005", "title": "PATIENT ACCESS TO MEDICAL RECORDS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15006", "title": "PATIENT GRIEVANCE PROCESS", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15007", "title": "CONFIDENTIALITY OF INFORMATION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15008", "title": "PATIENT RIGHTS AND RESPONSIBILITIES", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15009", "title": "HIV TESTING PROTOCOL", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15010", "title": "DISCLOSURE OF UNANTICIPATED OUTCOMES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15011", "title": "RIGHT TO VOTE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15012", "title": "PATIENT CLOTHING-MAIL-PHONE-ROOM ACCOMODATION-SPIRITUAL RESOURCES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15013", "title": "RIGHT TO REFUSE TREATMENT AND DISCHARGES REQUIRING JUDICIAL INTERVENTION", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15014", "title": "NONDISCRIMINATION OR RETALIAION", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15015", "title": "PERSONAL SEARCHES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15016", "title": "VIDEO SURVEILLANCE & PATEINT PHOTOGRAPHS AND CAMERAS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15017", "title": "ABUSE & NEGLECT", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "PATIENT RIGHTS", "policy": "15018", "title": "ORGAN, TISSUE - EYE DONATION, LA", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "QUALITY MANAGEMENT", "policy": "12000", "title": "ORGANIZATIONAL PERFORMANCE IMPROVEMENT PLAN", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "QUALITY MANAGEMENT", "policy": "12001", "title": "CONDUCTING ROOT CAUSE ANALYSIS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "QUALITY MANAGEMENT", "policy": "12002", "title": "FPPE-OPPE FOCUSED & ONGOING PROFESSIONAL PRACTICE EVALUATIONS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "QUALITY MANAGEMENT", "policy": "12003", "title": "METHOD OF PERFORMANCE ASSESSMENT", "forms": [], "departments": "", "risk": 4, "basis": "High compliance risk", "regulatory": "CMS / Joint Commission", "revision": ""}, {"section": "QUALITY MANAGEMENT", "policy": "12004", "title": "PATIENT SATISFACTION SURVEY", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "QUALITY MANAGEMENT", "policy": "12005", "title": "OCCURANCE REPORTING AND PROCESS", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "QUALITY MANAGEMENT", "policy": "12006", "title": "REQUIRED REPORTING OF PATIENT STATUS TO EXTERNAL AGENCIES", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "TRANSPORTATION SCOPE OF SERVICE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "TRANSPORATION SCHEDULE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "VEHICLE EMERGENCY AND URGENT CARE", "forms": ["45"], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "INFECTION CONTROL FOR TRANSPORTATION", "forms": [], "departments": "", "risk": 5, "basis": "Immediate patient/regulatory risk", "regulatory": "CMS / Joint Commission / DNV", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "VEHCILE AND DRIVER REPORT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "DRIVER FATIGUE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "TRANSPORTATION SAFETY AND RISK MANAGEMENT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "TRANSPORTATION HOURS AND OVERTIME", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "VEHICLE NEW EMPLOYEE ORIENTATION", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "VEHICLE MAINTENANCE", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "OPERATION OF WHEELCHAIR LIFT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "VEHICLE DAILY INSPECTION", "forms": [], "departments": "", "risk": 2, "basis": "Business operations", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "VEHICLE ACCIDENT PROCEDURE", "forms": [], "departments": "", "risk": 2, "basis": "Business operations", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "622", "title": "VEHICLE MAINTENANCE REQUEST", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6020", "title": "VEHICLE ACCIDENT FORM", "forms": [], "departments": "", "risk": 2, "basis": "Business operations", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6030", "title": "CLEAN VEHICLE REPORT", "forms": [], "departments": "", "risk": 2, "basis": "Business operations", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6040", "title": "VEHICLE DAILY INSPECTION AND MAINTENANCE REQUEST", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6044", "title": "PATIENT TRANSPORATION LOG", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6045", "title": "VEHICLE LOCATION REPORT", "forms": [], "departments": "", "risk": 2, "basis": "Business operations", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6047", "title": "ROSTER OF DRIVERS REPORT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6070", "title": "WEEKLY TRANSPORTATION SCHEDULE", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6075", "title": "SIGNATURE OF ACKNOWLEDGEMENT", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6076", "title": "TANSPORATION COMPETENCY EXAM", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6077", "title": "WHEELCHAIR LIFT OPERATION EXAM", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6078", "title": "DIVER COMPETENCY EXAM", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6079", "title": "VEHCILE ORIENTATION", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6080", "title": "DRIVER ORIENTATION", "forms": [], "departments": "", "risk": 3, "basis": "Operational compliance", "regulatory": "CMS / State", "revision": ""}, {"section": "TRANSPORTATION MANAGEMENT", "policy": "6081", "title": "DIRVER STATEMENT OF PROFICIENCY", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "WAIVED TESTING", "policy": "16000", "title": "WAIVED TESTING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}, {"section": "WAIVED TESTING", "policy": "16001", "title": "HEMOCULT TESTING", "forms": [], "departments": "", "risk": 1, "basis": "Administrative", "regulatory": "Corporate", "revision": ""}];

const SECTIONS = ["ADMISSION ASSESSMENT MANAGEMENT", "CASE MANAGEMENT", "DIAGNOSTIC MANAGEMENT", "DIETARY MANAGEMENT", "ENVIRONMENT OF CARE", "EMERGENCY MANAGEMENT", "HIM", "HUMAN RESOURCES", "INFECTION CONTROL", "LEADERSHIP MANAGEMENT", "LIFE SAFETY", "MEDICATION MANAGEMENT", "PROVISION OF CARE", "PATIENT RIGHTS", "QUALITY MANAGEMENT", "TRANSPORTATION MANAGEMENT", "WAIVED TESTING"];

/* Controlled forms linked to policy records. Forms Management is not one of the
   three menus being built out, so these are read-only reference records here. */
let CONTROLLED_FORMS = [
{id:"FRM-15008-A",name:"Patient Rights Acknowledgement",version:"v2.1",risk:5,file:"Patient_Rights_Acknowledgement.pdf",policies:["15008","15009"],roles:["Registered Nurse","Behavioral Health Technician / MHT","Hospital Administrator"],departments:["Nursing","Compliance / Risk"],facilities:["Enterprise / Corporate"],owner:"Compliance / Risk",notify:"Portal + Email + Acknowledgement Required"},
{id:"FRM-11012-B",name:"Medication Variance Review",version:"v3.0",risk:5,file:"Medication_Variance_Form.pdf",policies:["11012"],roles:["Registered Nurse","Director of Nursing","Pharmacy Director / Pharmacist"],departments:["Nursing","Pharmacy / Medication Management","Quality / Performance Improvement"],facilities:["Enterprise / Corporate"],owner:"Nursing",notify:"Portal + Email + Acknowledgement Required"},
{id:"FRM-6044",name:"Patient Transportation Log",version:"v1.4",risk:2,file:"Transportation_Log.xlsx",policies:["6044","6070"],roles:["Transportation / Driver","Environment of Care / Safety Officer"],departments:["Transportation"],facilities:["Enterprise / Corporate"],owner:"Environment of Care",notify:"Portal + Email"}
];

const FORM_ROLES = ["CEO / President","Chief Operating Officer","Chief Nursing Officer","Corporate Compliance Officer","Corporate Quality Director","Regional Director","Hospital Administrator","Director of Nursing","Assistant Director of Nursing","Medical Director","Psychiatrist","PMHNP / Nurse Practitioner","Registered Nurse","Licensed Practical Nurse","Behavioral Health Technician / MHT","Therapist / LCSW / LPC","Social Services Director","Case Manager / Discharge Planner","Utilization Review Director","Utilization Review Coordinator","Central Intake Director","Intake Coordinator","Quality / Performance Improvement Director","Risk Manager","Infection Preventionist","HIM / Medical Records Director","HIM Technician","Human Resources Director","HR Generalist","Business Development Director","Service Development Representative","IOP Coordinator","Pharmacy Director / Pharmacist","Dietary Director","Dietary Staff","Plant Operations Director","Maintenance Technician","Environment of Care / Safety Officer","Security","Transportation / Driver","Billing / Revenue Cycle","Finance / Accounting","IT / Systems Administrator","Executive Assistant / Administrative Staff"];

const FORM_DEPTS = ["Executive Leadership","Administration","Nursing","Medical Staff","Clinical / Therapy","Social Services","Case Management","Utilization Review","Central Intake / Admissions","Quality / Performance Improvement","Compliance / Risk","Human Resources","HIM / Medical Records","Pharmacy / Medication Management","Infection Prevention","Environment of Care","Life Safety","Emergency Management","Dietary","Business Development / Service Development","IOP","Transportation","Finance / Accounting","Revenue Cycle / Billing","IT / Security","Plant Operations / Maintenance"];

const FORM_FACILITIES = ["Enterprise / Corporate","Freedom Bastrop","Freedom Bunkie","Freedom DeQuincy","Freedom Ferriday","Freedom Lake Charles","Freedom Leesville","Freedom Minden","Freedom Monroe","Freedom West Monroe","Freedom Ville Platte","Freedom Magnolia","Freedom Greenville","Freedom Plainview"];

/* ============================================ tracker form-number mapping
   POLICY_FORM_MAP (data/policy-form-map.js) is the authority on which form
   belongs to which policy. Links are keyed by policy NUMBER and resolved
   lazily, so a mapped policy that is not in the library yet picks up its
   forms automatically the moment that policy record exists.
   ======================================================================== */

const FORM_TO_POLICIES = new Map();   // "00010" -> ["7017","15006"]
const POLICY_TO_FORMS = new Map();    // "15008" -> ["00018","00134","00159"]
const FORM_TITLES = new Map();        // "00010" -> policy title it was listed under
const FORM_KEYS = new Map();          // normalized lookup key -> canonical form number

/* Worksheet tab names in the tracker do not all match the library's TOC
   section names. Without this, importing would split HR policies across two
   sections. Anything not listed here is taken at face value. */
const SECTION_ALIASES = {
  'HUMAN RESOURCES MANAGEMENT': 'HUMAN RESOURCES',
  'INFECTION CONTROL AND PREVENTIO': 'INFECTION CONTROL',
  'INFECTION CONTROL AND PREVENTION': 'INFECTION CONTROL',
  'TRANSPORTATION': 'TRANSPORTATION MANAGEMENT',
  'DIAGNOSITC MANAGMENT': 'DIAGNOSTIC MANAGEMENT',
  'ORGANIZATIONAL MANAGMENT': 'ORGANIZATIONAL MANAGEMENT',
  'RESTRAINT SECLUSION': 'RESTRAINT AND SECLUSION'
};
const sectionForWorksheet = ws => SECTION_ALIASES[ws.toUpperCase()] || ws.toUpperCase();

/* "TP 4567" and "TP4567" are the same form; bare numbers pad to 5 digits. */
function normFormKey(token) {
  const t = String(token).toUpperCase().replace(/[\s._-]/g, '');
  return /^\d+$/.test(t) ? t.padStart(5, '0') : t;
}

function buildFormMapIndex() {
  if (typeof POLICY_FORM_MAP === 'undefined') return;
  for (const section of POLICY_FORM_MAP.sections) {
    for (const m of section.policy_form_mappings) {
      const pol = String(m.policy_number);
      for (const raw of m.associated_form_numbers) {
        const form = String(raw);
        if (!FORM_TO_POLICIES.has(form)) FORM_TO_POLICIES.set(form, []);
        if (!FORM_TO_POLICIES.get(form).includes(pol)) FORM_TO_POLICIES.get(form).push(pol);
        if (!POLICY_TO_FORMS.has(pol)) POLICY_TO_FORMS.set(pol, []);
        if (!POLICY_TO_FORMS.get(pol).includes(form)) POLICY_TO_FORMS.get(pol).push(form);
        if (!FORM_TITLES.has(form)) FORM_TITLES.set(form, m.policy_title);
        FORM_KEYS.set(normFormKey(form), form);
      }
    }
  }
}

/* Every policy carries the form numbers the tracker expects, so the library
   and TOC show "expected but not yet uploaded" before any file arrives. */
function applyMappingToPolicies() {
  POLICIES.forEach(p => {
    const mapped = POLICY_TO_FORMS.get(String(p.policy)) || [];
    p.forms = [...new Set([...(p.forms || []).map(String), ...mapped])];
  });
}

const policyExists = num => POLICIES.some(p => p.policy === String(num));
const mappedPolicyNumbers = () => [...POLICY_TO_FORMS.keys()];
const unresolvedPolicyNumbers = () => mappedPolicyNumbers().filter(n => !policyExists(n));

/* Pull a known form number out of a filename.
   A bare number that is also a live policy number stays a policy — only an
   as-written match (leading zeros intact) is treated as a form. */
function detectFormNumber(filename) {
  const base = filename.replace(/\.[^.]+$/, '').toUpperCase();
  const tokens = base.match(/[A-Z]{0,3}[\s._-]?\d{2,6}/g) || [];
  let padded = null;
  for (const tok of tokens) {
    const cleaned = tok.replace(/[\s._-]/g, '');
    if (FORM_KEYS.has(cleaned)) return {number: FORM_KEYS.get(cleaned), exact: true};
    const key = normFormKey(tok);
    if (FORM_KEYS.has(key) && !padded) {
      const bare = cleaned.replace(/^[A-Z]+/, '');
      padded = {number: FORM_KEYS.get(key), exact: false, collides: policyExists(bare)};
    }
  }
  return padded;
}

function mappedPoliciesFor(formNumber) {
  const nums = FORM_TO_POLICIES.get(formNumber) || [];
  return {
    numbers: nums,
    indexes: nums.map(n => POLICIES.findIndex(p => p.policy === n)).filter(i => i >= 0),
    unresolved: nums.filter(n => !policyExists(n))
  };
}

/* ---------- helpers ---------- */
const byId = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const riskBadge = n => `<span class="riskbadge r${n}" title="Enterprise Risk Level ${n}">${n}</span>`;
const formsForPolicy = num => CONTROLLED_FORMS.filter(f => (f.policies || []).includes(String(num)));

/* Every form a policy points at, controlled or still expected from the
   tracker, in one list so the library, the record modal, and the TOC panel
   all show the same thing. */
function policyFormEntries(p) {
  const controlled = formsForPolicy(p.policy);
  const ids = new Set(controlled.map(f => String(f.id)));
  return [
    ...controlled.map(f => ({id: String(f.id), form: f, controlled: true})),
    ...(p.forms || []).map(String).filter(id => !ids.has(id)).map(id => ({id, form: null, controlled: false}))
  ];
}

/* Opens whichever it is: the controlled form, or a record of a form the
   tracker expects that nobody has uploaded yet. */
function openLinkedForm(id) {
  const f = CONTROLLED_FORMS.find(x => String(x.id) === String(id));
  if (f) { openForm(f.id); return; }
  const mapped = mappedPoliciesFor(String(id));
  openDocViewer({
    title: `Form ${id}`,
    subtitle: 'Expected from the enterprise tracker — not yet uploaded',
    file: null,
    linkedPolicies: mapped.indexes,
    meta: [
      ['Status', '<span class="status pending">Not yet uploaded</span>'],
      ['Form number', esc(String(id))],
      ['Listed under', esc(FORM_TITLES.get(String(id)) || 'Enterprise policy tracker')],
      ['Policies it serves', mapped.numbers.length ? esc(mapped.numbers.join(', ')) : '<span class="subtle">—</span>']
    ],
    versions: [],
    placeholder: `<div class="paper"><div class="watermark">NOT UPLOADED</div><div class="paperhead"><h4>Form ${esc(String(id))}</h4><div class="subtle">Expected by the enterprise policy tracker</div></div>
<p>The tracker lists this form against ${mapped.numbers.length ? `polic${mapped.numbers.length === 1 ? 'y' : 'ies'} <b>${esc(mapped.numbers.join(', '))}</b>` : 'this policy'}, but the controlled document has not been uploaded yet.</p>
<p class="subtle">Ask a policy administrator to upload it — once it arrives it links itself to every policy the tracker lists and opens here.</p></div>`
  });
}
let currentSection = '';

/* ------------------------------------------------------------- access
   Staff see the three reading views. Everything that changes controlled
   content — forms, assignment rules, the directory, uploads, approvals —
   is administrator-only. */
const STAFF_VIEWS = ['dashboard', 'library', 'toc'];
let previewRole = null;

const effectiveRole = () => previewRole || (currentUser() ? securityRoleOf(currentUser()) : 'Employee');
const isAdmin = () => isAdminRole(effectiveRole());
const canSee = view => isAdmin() || STAFF_VIEWS.includes(view);

function setPreviewRole(role) {
  previewRole = role === '__self__' ? null : role;
  applyAccess();
  const active = document.querySelector('.view.active');
  if (active && !canSee(active.id)) showView('dashboard', 'Enterprise Policy Dashboard');
  else refreshAccessDependentViews();
  toast(`Previewing the portal as ${effectiveRole()}`);
}

function applyAccess() {
  document.body.dataset.access = isAdmin() ? 'admin' : 'staff';
  const note = byId('accessNote');
  if (note) {
    const previewing = previewRole && previewRole !== securityRoleOf(currentUser());
    note.style.display = previewing ? '' : 'none';
    note.innerHTML = previewing
      ? `Previewing as <b>${esc(effectiveRole())}</b> — ${isAdmin() ? 'administrator tools are visible.' : 'only Dashboard, Policy &amp; Form Library, and Table of Contents are available.'} <button class="btn outline" style="padding:4px 9px;font-size:11px;margin-left:6px" onclick="byId('previewRole').value='__self__';setPreviewRole('__self__')">Back to my role</button>`
      : '';
  }
}

function refreshAccessDependentViews() {
  renderPolicyTable();
  if (currentSection) renderTocPolicyList();
}

function showView(id, label) {
  if (!canSee(id)) {
    toast('That area is limited to administrators');
    id = 'dashboard';
    label = 'Enterprise Policy Dashboard';
  }
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  byId(id).classList.add('active');
  document.querySelectorAll('.navbtn[data-view]').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.navbtn[data-view="${id}"]`);
  if (btn) btn.classList.add('active');
  byId('pageTitle').textContent = label || (btn ? btn.innerText.trim() : 'Freedom Policy Center');
  window.scrollTo({top: 0, behavior: 'smooth'});
}
function toast(msg) {
  const t = byId('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 2300);
}
function focusSearch() {
  showView('library', 'Policy & Form Library');
  byId('search').focus();
}

/* ---------- dashboard ---------- */
function renderDashboard() {
  const high = POLICIES.filter(p => p.risk >= 4).length;
  const linked = POLICIES.filter(p => (p.forms || []).length || formsForPolicy(p.policy).length).length;
  byId('kpiPolicies').textContent = POLICIES.length;
  byId('kpiSections').textContent = SECTIONS.length;
  byId('kpiHighRisk').textContent = high;
  byId('kpiForms').textContent = CONTROLLED_FORMS.length;
  byId('kpiFormsNote').textContent = `Linked to ${linked} policy records`;
  const counts = {1:0,2:0,3:0,4:0,5:0};
  POLICIES.forEach(p => counts[p.risk] = (counts[p.risk] || 0) + 1);
  const max = Math.max(...Object.values(counts), 1);
  byId('riskDistribution').innerHTML = [5,4,3,2,1].map(n =>
    `<div class="riskrow" onclick="filterRisk('${n}')" style="cursor:pointer" title="Filter the library on Risk ${n}">${riskBadge(n)}<div class="progress"><span style="width:${Math.round(counts[n]/max*100)}%;background:var(--r${n})"></span></div><b>${counts[n]}</b></div>`
  ).join('');
}
function filterRisk(n) {
  showView('library', 'Policy & Form Library');
  byId('riskFilter').value = String(n);
  byId('sectionFilter').value = '';
  byId('search').value = '';
  renderPolicyTable();
}

/* ---------- policy & form library ---------- */
function statusFor(p, i) {
  if (p.risk >= 5) return '<span class="status overdue">Acknowledgement Due</span>';
  if (i % 5 === 0) return '<span class="status pending">Review Pending</span>';
  return '<span class="status good">Current</span>';
}
function renderPolicyTable() {
  const q = byId('search').value.toLowerCase();
  const risk = byId('riskFilter').value;
  const sec = byId('sectionFilter').value;
  const data = POLICIES.map((p, idx) => ({p, idx})).filter(({p}) =>
    (!q || (p.title + ' ' + p.policy + ' ' + p.section).toLowerCase().includes(q)) &&
    (!risk || String(p.risk) === risk) &&
    (!sec || p.section === sec));
  byId('policyCount').textContent = `${data.length} records`;
  byId('policyRows').innerHTML = data.length ? data.slice(0, 150).map(({p, idx}, i) => {
    const entries = policyFormEntries(p);
    const pending = pendingCount(idx);
    return `<tr><td>${riskBadge(p.risk)}</td><td><div class="policytitle" onclick="openPolicy(${idx})">${esc(p.policy)} · ${esc(p.title)}</div><div class="subtle">${esc(p.section)}${p.provisional ? ' · <span class="status pending">Provisional — from tracker mapping</span>' : ''}${pending ? ` · <span class="status pendingpill">${pending} pending upload${pending === 1 ? '' : 's'}</span>` : ''}</div></td><td>${esc(p.regulatory || 'Corporate')}</td><td>${entries.length ? entries.map(e => `<button class="doclink${e.controlled ? '' : ' expected'}" style="padding:4px 7px;margin:2px 3px 2px 0" title="${e.controlled ? 'Open the controlled form' : 'Expected from the tracker — not yet uploaded'}" onclick="openLinkedForm('${esc(e.id)}')">${esc(e.id)}</button>`).join('') : '—'}</td><td>${statusFor(p, i)}</td><td><button class="btn outline touchbtn" onclick="openPolicy(${idx})">Open</button></td></tr>`;
  }).join('') : '<tr><td colspan="6" class="subtle" style="text-align:center;padding:26px">No policies match the current filters.</td></tr>';
}
function resetLibraryFilters() {
  byId('search').value = '';
  byId('sectionFilter').value = '';
  byId('riskFilter').value = '';
  renderPolicyTable();
  toast('Library filters reset');
}
function filterSection(s) {
  showView('library', 'Policy & Form Library');
  byId('sectionFilter').value = s;
  byId('riskFilter').value = '';
  byId('search').value = '';
  renderPolicyTable();
}

/* ---------- policy record modal ---------- */
function openPolicy(idx) {
  const p = POLICIES[idx];
  if (!p) return;
  const entries = policyFormEntries(p);
  const formList = entries.map(e => e.controlled
    ? `<div class="form-info-card" style="padding:9px 11px"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><div><b>${esc(e.form.id)} · ${esc(e.form.name)}</b><div class="subtle">${esc(e.form.version)} · ${esc(e.form.file)} · Owner: ${esc(e.form.owner)}</div></div><button class="btn primary" style="padding:6px 11px;font-size:11px" onclick="byId('policyModal').classList.remove('show');openLinkedForm('${esc(e.id)}')">Open Form</button></div></div>`
    : `<div class="form-info-card" style="padding:9px 11px;background:#fbfcfd"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><div><b>Form ${esc(e.id)}</b><div class="subtle">Expected from the tracker — not yet uploaded</div></div><button class="btn outline" style="padding:6px 11px;font-size:11px" onclick="byId('policyModal').classList.remove('show');openLinkedForm('${esc(e.id)}')">View</button></div></div>`);
  byId('modalContent').innerHTML = `<div style="display:flex;justify-content:space-between;gap:15px;align-items:start"><div><div class="subtle">${esc(p.section)}</div><h3>${esc(p.policy)} · ${esc(p.title)}</h3></div>${riskBadge(p.risk)}</div>
<div class="risk-legend"><span class="r${p.risk}">Risk ${p.risk}: ${esc(p.basis || 'Enterprise risk classification')}</span><span style="background:#175c92">${esc(p.regulatory || 'Corporate')}</span></div>
<div class="formrow"><div class="field"><label>Owner</label><input value="Corporate Policy Administrator" readonly></div><div class="field"><label>Next Review</label><input value="09/30/2026" readonly></div></div>
<div class="docpreview"><b>Controlled Policy Preview</b><p>This prototype connects the enterprise policy record to its controlled document, associated forms, revision history, and employee acknowledgements. The production system would render the approved PDF/DOCX here and prevent obsolete versions from being used.</p><p><b>Notification rule:</b> Any approved revision creates a group notification and re-acknowledgement task for the assigned audience.</p></div>
<div style="margin-top:14px"><div class="panelhead" style="margin-bottom:6px"><h4 style="font-size:15px">Forms Attached To This Policy</h4><span class="pill">${formList.length} linked</span></div>${formList.length ? formList.join('') : '<div class="subtle" style="padding:14px;text-align:center">No forms are linked to this policy.</div>'}</div>
<div style="display:none"></div>
<div class="readtrack"><div><b>84%</b><span class="subtle">Acknowledged</span></div><div><b>118</b><span class="subtle">Assigned</span></div><div><b>19</b><span class="subtle">Outstanding</span></div></div>
<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px"><button class="btn outline touchbtn" onclick="byId('policyModal').classList.remove('show');openVersionHistory(${idx})">Version History</button><button class="btn primary touchbtn" onclick="acknowledge('${esc(p.policy)}')">Acknowledge Policy</button></div>`;
  byId('policyModal').classList.add('show');
}
function acknowledge(id) {
  byId('policyModal').classList.remove('show');
  const mine = ASSIGNMENTS.find(a => a.userId === CURRENT_USER_ID && a.status === 'open'
    && a.policyIdx !== null && POLICIES[a.policyIdx].policy === String(id));
  if (mine) { acknowledgeAssignment(mine.id); return; }
  toast(`Policy ${id} acknowledged — timestamp recorded`);
}

/* ---------- table of contents ---------- */
function renderQuickTOC() {
  byId('quickTocCount').textContent = SECTIONS.length;
  byId('quickToc').innerHTML = SECTIONS.map((s, i) =>
    `<button class="navbtn quicktoc-btn" type="button" onclick="openTocSection('${esc(s)}')" aria-label="Open ${esc(s)} policies in table of contents"><span class="tocnum">${i+1}</span><span>${esc(s)}</span></button>`
  ).join('');
}
function renderTOC() {
  const counts = {};
  POLICIES.forEach(p => counts[p.section] = (counts[p.section] || 0) + 1);
  byId('tocGrid').innerHTML = SECTIONS.map(s => {
    const n = counts[s] || 0;
    const high = POLICIES.filter(p => p.section === s && p.risk >= 4).length;
    const formRefs = POLICIES.filter(p => p.section === s)
      .reduce((a, p) => a + ((p.forms || []).length) + formsForPolicy(p.policy).length, 0);
    return `<button type="button" class="toccard" data-section="${esc(s)}" aria-controls="tocPolicyList" onclick="openTocSection('${esc(s)}')"><h5>${esc(s)}</h5><div class="meta"><span>${n} policies</span><span>${high} high-risk</span></div><div class="meta" style="margin-top:6px"><span>▧ ${formRefs} form links</span><span class="openhint">View ${n} policies ›</span></div><div class="bar progress"><span style="width:${Math.min(100, Math.round(high / Math.max(1, n) * 100))}%"></span></div></button>`;
  }).join('');
}
function openTocSection(s) {
  showView('toc', 'Enterprise Table of Contents');
  currentSection = s;
  document.querySelectorAll('.toccard').forEach(c => c.classList.toggle('active', c.dataset.section === s));
  const search = byId('tocSectionSearch'), risk = byId('tocSectionRisk');
  search.value = ''; search.disabled = false;
  risk.value = ''; risk.disabled = false;
  renderTocPolicyList();
  // the section list sits below the card grid — bring it into view so the click has a visible result
  byId('tocWorkspace').scrollIntoView({behavior: 'smooth', block: 'start'});
}

function renderTocPolicyList() {
  if (!currentSection) return;
  const q = (byId('tocSectionSearch').value || '').toLowerCase();
  const risk = byId('tocSectionRisk').value;
  const all = POLICIES.map((p, i) => ({p, i})).filter(x => x.p.section === currentSection);
  const rows = all.filter(({p}) =>
    (!q || (p.policy + ' ' + p.title).toLowerCase().includes(q)) &&
    (!risk || String(p.risk) === risk));
  byId('tocSectionTitle').textContent = currentSection;
  byId('tocSectionMeta').textContent = rows.length === all.length
    ? `${all.length} policies · select a policy for current information and forms`
    : `Showing ${rows.length} of ${all.length} policies`;
  byId('tocPolicyList').innerHTML = rows.length ? rows.map(({p, i}) => {
    const forms = (p.forms || []).length + formsForPolicy(p.policy).length;
    const pending = pendingCount(i);
    return `<div class="tocpolicyrow" id="toc-policy-${i}" onclick="selectTocPolicy(${i})"><div>${riskBadge(p.risk)}</div><div><div class="policytitle">${esc(p.policy)} · ${esc(p.title)}</div><div class="subtle">${esc(p.regulatory || 'Corporate')} · ${forms} form link${forms === 1 ? '' : 's'}${pending ? ` · <span class="status pendingpill">${pending} pending upload${pending === 1 ? '' : 's'}</span>` : ''}</div></div><span class="pill">Open ›</span></div>`;
  }).join('') : '<div class="toc-empty">No policies match this filter.</div>';
  if (rows.length) selectTocPolicy(rows[0].i);
}

function openSectionInLibrary() {
  if (!currentSection) { toast('Select a TOC section first'); return; }
  filterSection(currentSection);
}
function selectTocPolicy(idx) {
  const p = POLICIES[idx];
  if (!p) return;
  document.querySelectorAll('.tocpolicyrow').forEach(x => x.classList.remove('active'));
  const row = byId(`toc-policy-${idx}`);
  if (row) row.classList.add('active');
  const uploaded = formsForPolicy(p.policy);
  const uploadedIds = new Set(uploaded.map(f => String(f.id)));
  const trackerOnly = (p.forms || []).map(String).filter(id => !uploadedIds.has(id));
  const cards = [];
  uploaded.forEach(f => cards.push(`<div class="form-info-card"><div class="form-source">Controlled Form</div><h6>${esc(f.id)} · ${esc(f.name)}</h6><div class="subtle">${esc(f.version)} · ${esc(f.file)} · Owner: ${esc(f.owner)}</div><div class="form-info-meta"><span class="pill">Risk ${f.risk}</span><span class="pill">${f.roles.length} roles</span><span class="pill">${f.departments.length} departments</span><span class="pill">${f.facilities.length} facilities</span></div><div class="subtle"><b>Roles:</b> ${f.roles.length ? f.roles.map(esc).join(', ') : 'None assigned'}</div><div class="subtle" style="margin-top:4px"><b>Departments:</b> ${f.departments.length ? f.departments.map(esc).join(', ') : 'None assigned'}</div><div class="subtle" style="margin-top:4px"><b>Notification:</b> ${esc(f.notify)}</div><div style="display:flex;gap:7px;justify-content:flex-end;margin-top:9px">${isAdmin() ? `<button class="btn outline touchbtn" onclick="manageForm('${esc(f.id)}')">Manage Form</button>` : ''}<button class="btn primary touchbtn" onclick="openForm('${esc(f.id)}')">Open Form</button></div></div>`));
  trackerOnly.forEach(id => cards.push(`<div class="form-info-card"><div class="form-source">Tracker-Linked Form</div><h6>Form ${esc(id)}</h6><div class="subtle">Referenced by the enterprise tracker. Version, owner, roles, departments, facilities and revision history are managed once the form is brought under control.</div></div>`));
  byId('tocPolicyInfo').innerHTML = `<div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><div><div class="subtle">${esc(p.section)}</div><h3 style="margin:4px 0 8px">${esc(p.policy)} · ${esc(p.title)}</h3></div>${riskBadge(p.risk)}</div>
<div class="risk-legend"><span class="r${p.risk}">Risk ${p.risk}: ${esc(p.basis || 'Enterprise risk classification')}</span><span style="background:#175c92">${esc(p.regulatory || 'Corporate')}</span></div>
<div class="formrow"><div class="field"><label>Current Revision</label><input value="${esc(p.revision || 'Current controlled version')}" readonly></div><div class="field"><label>Total Linked Forms</label><input value="${cards.length}" readonly></div></div>
<div style="margin-top:13px"><div class="panelhead" style="margin-bottom:7px"><h4>Forms Associated With This Policy</h4><span class="pill">${cards.length} linked</span></div>${cards.length ? cards.join('') : '<div class="toc-empty" style="padding:18px">No forms are currently linked to this policy.</div>'}</div>
${pendingBlock(idx)}
<div style="display:flex;gap:7px;justify-content:flex-end;margin-top:12px"><button class="btn outline touchbtn" onclick="openVersionHistory(${idx})">Version History</button><button class="btn outline touchbtn" onclick="openPolicy(${idx})">Open Policy Record</button><button class="btn primary touchbtn" onclick="filterSection('${esc(p.section)}')">View Section in Library</button></div>`;
}

/* ---------- init ---------- */
function init() {
  buildFormMapIndex();
  applyMappingToPolicies();
  SECTIONS.forEach(s => byId('sectionFilter').insertAdjacentHTML('beforeend', `<option>${esc(s)}</option>`));
  byId('libraryNavCount').textContent = POLICIES.length;
  byId('tocNavCount').textContent = SECTIONS.length;
  renderDashboard();
  renderQuickTOC();
  renderTOC();
  renderPolicyTable();
  renderUploadRules();
  fillMulti('formOwnerDept', FORM_DEPTS);
  fillMulti('formRoles', FORM_ROLES);
  fillMulti('formDepartments', FORM_DEPTS);
  fillMulti('formFacilities', FORM_FACILITIES);
  renderPolicyMulti();
  renderFormAssignSummary();
  renderForms();
  fillMulti('ruleFacilities', FORM_FACILITIES);
  fillMulti('ruleDepartments', FORM_DEPTS);
  fillMulti('ruleRoles', FORM_ROLES);
  byId('ruleSubjectSection').innerHTML = SECTIONS.map(x => `<option>${esc(x)}</option>`).join('');
  renderRuleSubjectPolicies();
  seedAssignments();
  renderAssignments();
  renderMappingCoverage();
  fillMulti('userFacility', FORM_FACILITIES);
  fillMulti('userRoles', FORM_ROLES);
  fillMulti('userDepartments', FORM_DEPTS);
  byId('userSecurityRole').innerHTML = SECURITY_ROLES.map(r => `<option>${esc(r.name)}</option>`).join('');
  byId('userSecurityRole').addEventListener('change', renderSignInBox);
  byId('userEmail').addEventListener('input', renderSignInBox);
  byId('userRoleFilter').insertAdjacentHTML('beforeend', SECURITY_ROLES.map(r => `<option>${esc(r.name)}</option>`).join(''));
  renderSecurityRoles();
  renderUsers();
  renderUserPreview();
  renderSignedInUser();
  byId('previewRole').innerHTML = `<option value="__self__">My role — ${esc(securityRoleOf(currentUser()))}</option>` +
    SECURITY_ROLES.map(r => `<option value="${esc(r.name)}">${esc(r.name)}</option>`).join('');
  applyAccess();
}
document.addEventListener('DOMContentLoaded', init);


/* ================================================================== uploads
   Bulk ingestion of controlled documents. The prototype runs the real
   client-side half — batch limits, type validation, fingerprint dedupe,
   policy matching — and simulates the server pipeline stages described in
   docs/file-uploads.md (virus scan, text extraction, PDF render, index).
   ========================================================================= */

const UPLOAD_RULES = {
  accepted: ['pdf','docx','doc','xlsx','csv','pptx','png','jpg','jpeg','txt','md','tif','tiff'],
  quarantine: ['docm','xlsm','pptm'],
  blocked: ['exe','msi','sh','bat','js','jar','html','htm','zip','rar','7z','dll','app'],
  maxBytes: 50 * 1024 * 1024,          // standard document
  maxScanBytes: 250 * 1024 * 1024,     // scanned PDF/TIFF batches
  scanExts: ['pdf','tif','tiff'],
  maxFiles: 250,
  maxBatchBytes: 2 * 1024 * 1024 * 1024,
  concurrency: 4
};
const PIPELINE_STAGES = ['Virus scan', 'Text extract', 'Render PDF', 'Index'];

let QUEUE = [];                 // files staged for this batch
let queueSeq = 0;
let uploading = false;
const INGESTED = new Set();     // fingerprints already accepted this session
/* Every controlled document's versions live here: the baseline record that
   was in force when the library was seeded, plus each uploaded version.
   Nothing is ever overwritten — approving a pending version supersedes the
   previous one and both are kept. */
const POLICY_VERSIONS = new Map();    // policy index -> [version]
let versionSeq = 0;

function versionsFor(idx) {
  if (!POLICY_VERSIONS.has(idx)) {
    const p = POLICIES[idx];
    POLICY_VERSIONS.set(idx, [{
      id: ++versionSeq,
      label: p.revision || 'v1.0',
      status: 'published',
      at: null,
      by: 'Imported from the enterprise tracker',
      filename: null, size: null, file: null, hash: null,
      note: 'Baseline record — controlled document not yet uploaded'
    }]);
  }
  return POLICY_VERSIONS.get(idx);
}

function nextVersionLabel(idx) {
  const nums = versionsFor(idx)
    .map(v => parseFloat(String(v.label).replace(/^v/i, '')))
    .filter(n => !isNaN(n));
  return 'v' + ((nums.length ? Math.max(...nums) : 1) + 0.1).toFixed(1);
}

function addUploadedVersion(idx, row) {
  const v = {
    id: ++versionSeq,
    label: nextVersionLabel(idx),
    status: 'pending',
    at: new Date(),
    by: 'Enterprise Admin',
    filename: row.name, size: row.file.size, file: row.file,
    hash: row.fp ? row.fp.split(':')[0] : null,
    note: 'Uploaded — awaiting review and approval'
  };
  versionsFor(idx).push(v);
  return v;
}

/* Approval is the deliberate step: the pending version takes force and the
   one it replaces becomes superseded. */
function publishVersion(idx, versionId) {
  if (!isAdmin()) { toast('Publishing a controlled version is limited to administrators'); return; }
  const list = versionsFor(idx);
  const v = list.find(x => x.id === versionId);
  if (!v || v.status !== 'pending') return;
  if (!confirm(`Publish ${v.label} of ${POLICIES[idx].policy}? The version in force becomes superseded and staff are re-assigned this text.`)) return;
  list.forEach(x => { if (x.status === 'published') { x.status = 'superseded'; x.retiredAt = new Date(); } });
  v.status = 'published';
  v.publishedAt = new Date();
  v.note = 'Published — current controlled version';
  POLICIES[idx].revision = v.label;
  renderVersionHistory(idx);
  renderPolicyTable();
  renderTOC();
  if (currentSection) renderTocPolicyList();
  toast(`${POLICIES[idx].policy} ${v.label} published — previous version superseded`);
}

const pendingCount = idx => versionsFor(idx).filter(v => v.status === 'pending').length;
const fmtSize = b => b >= 1024 * 1024 * 1024 ? (b / 1073741824).toFixed(2) + ' GB'
  : b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB'
  : b >= 1024 ? Math.round(b / 1024) + ' KB' : b + ' B';
const extOf = name => (name.split('.').pop() || '').toLowerCase();

function pendingBlock(idx) {
  const list = versionsFor(idx).filter(v => v.status === 'pending');
  if (!list.length) return '';
  return `<div class="form-info-card" style="border-left:4px solid var(--r3)"><div class="form-source">Pending Upload</div>${list.map(v => `<div style="display:flex;justify-content:space-between;gap:8px;align-items:center;margin:4px 0"><div class="subtle"><b>${esc(v.filename)}</b> · ${esc(fmtSize(v.size))} · ${esc(v.label)} · uploaded ${esc(v.at.toLocaleString())}</div><button class="btn outline" style="padding:5px 9px;font-size:11px" onclick="openVersionDoc(${idx}, ${v.id})">Open</button></div>`).join('')}<div class="subtle" style="margin-top:6px">Awaiting review and approval before it becomes the published version. <button class="btn outline" style="padding:4px 8px;font-size:11px" onclick="openVersionHistory(${idx})">Version history</button></div></div>`;
}

function renderUploadRules() {
  const el = byId('uploadRules');
  if (!el) return;
  el.innerHTML = `<b>Accepted:</b> ${UPLOAD_RULES.accepted.map(e => '.' + e).join(', ')} · <b>Quarantined (admin release):</b> ${UPLOAD_RULES.quarantine.map(e => '.' + e).join(', ')} · <b>Blocked:</b> executables, scripts, archives, HTML · <b>Limits:</b> ${fmtSize(UPLOAD_RULES.maxBytes)} per file (${fmtSize(UPLOAD_RULES.maxScanBytes)} for scanned PDF/TIFF), ${UPLOAD_RULES.maxFiles} files / ${fmtSize(UPLOAD_RULES.maxBatchBytes)} per batch. Blank controlled documents only — do not upload completed patient forms.`;
}

function openUpload() {
  if (!isAdmin()) { toast('Uploading controlled documents is limited to administrators'); return; }
  byId('uploadModal').classList.add('show');
  renderUploadRules();
  fillMulti('formOwnerDept', FORM_DEPTS);
  fillMulti('formRoles', FORM_ROLES);
  fillMulti('formDepartments', FORM_DEPTS);
  fillMulti('formFacilities', FORM_FACILITIES);
  renderPolicyMulti();
  renderFormAssignSummary();
  renderForms();
}
function closeUpload() {
  if (uploading) { toast('Upload in progress — let the batch finish'); return; }
  byId('uploadModal').classList.remove('show');
}
function clearQueue() {
  if (uploading) { toast('Upload in progress'); return; }
  QUEUE = [];
  renderQueue();
  toast('Queue cleared');
}

/* Prototype fingerprint: SHA-256 where the browser exposes it (secure context),
   otherwise a cheap content hash. Production hashes the full file server-side. */
async function fingerprint(file) {
  const slice = await file.slice(0, Math.min(file.size, 8 * 1024 * 1024)).arrayBuffer();
  if (window.crypto && crypto.subtle && crypto.subtle.digest) {
    const digest = await crypto.subtle.digest('SHA-256', slice);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('') + ':' + file.size;
  }
  const bytes = new Uint8Array(slice);
  let h = 0x811c9dc5;
  for (let i = 0; i < bytes.length; i++) { h ^= bytes[i]; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16) + ':' + file.size;
}

function classify(file) {
  const ext = extOf(file.name);
  if (UPLOAD_RULES.blocked.includes(ext)) return {status: 'rejected', note: 'Blocked file type'};
  if (UPLOAD_RULES.quarantine.includes(ext)) return {status: 'quarantine', note: 'Macro-enabled — admin release required'};
  if (!UPLOAD_RULES.accepted.includes(ext)) return {status: 'rejected', note: `Unsupported type .${ext || '?'}`};
  const cap = UPLOAD_RULES.scanExts.includes(ext) ? UPLOAD_RULES.maxScanBytes : UPLOAD_RULES.maxBytes;
  if (file.size > cap) return {status: 'rejected', note: `Over the ${fmtSize(cap)} limit`};
  if (file.size === 0) return {status: 'rejected', note: 'Empty file'};
  return {status: 'ready', note: ''};
}

function inferKind(name) {
  const n = name.toLowerCase();
  const ext = extOf(name);
  const hit = detectFormNumber(name);
  if (hit && (hit.exact || !hit.collides)) return 'form';
  if (/^frm[-_ ]/.test(n) || n.includes('form')) return 'form';
  if (['png','jpg','jpeg','txt','md','pptx'].includes(ext)) return 'attachment';
  return 'policy';
}

/* Match "15008 Patient Rights v4.2.docx" -> policy 15008. Falls back to title
   overlap, and flags ambiguity when a policy number repeats (e.g. 622). */
function matchPolicy(name) {
  const base = name.replace(/\.[^.]+$/, '');
  const num = (base.match(/\b(\d{3,5})\b/) || [])[1];
  const tokens = base.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length > 3);
  const score = p => {
    const title = p.title.toLowerCase();
    return tokens.reduce((a, t) => a + (title.includes(t) ? 1 : 0), 0);
  };
  if (num) {
    const hits = POLICIES.map((p, i) => ({p, i})).filter(x => x.p.policy === num);
    if (hits.length === 1) return {idx: hits[0].i, note: ''};
    if (hits.length > 1) {
      const best = hits.map(x => ({...x, s: score(x.p)})).sort((a, b) => b.s - a.s)[0];
      return {idx: best.i, note: best.s ? '' : `Policy ${num} repeats — verify the match`};
    }
  }
  const ranked = POLICIES.map((p, i) => ({i, s: score(p)})).sort((a, b) => b.s - a.s)[0];
  if (ranked && ranked.s >= 2) return {idx: ranked.i, note: 'Matched on title — verify'};
  return {idx: null, note: 'No policy match — choose one'};
}

async function queueFiles(fileList) {
  const files = [...fileList];
  if (!files.length) return;
  let added = 0, skipped = 0;
  for (const file of files) {
    if (QUEUE.length >= UPLOAD_RULES.maxFiles) { skipped++; continue; }
    const batchBytes = QUEUE.reduce((a, r) => a + r.file.size, 0);
    if (batchBytes + file.size > UPLOAD_RULES.maxBatchBytes) { skipped++; continue; }
    const verdict = classify(file);
    const row = {
      id: ++queueSeq, file, name: file.name, ext: extOf(file.name),
      kind: inferKind(file.name), targetIdx: null,
      status: verdict.status, note: verdict.note, stage: '', progress: 0, fp: null
    };
    if (row.status === 'ready' || row.status === 'quarantine') {
      row.fp = await fingerprint(file);
      if (INGESTED.has(row.fp) || QUEUE.some(r => r.fp === row.fp)) {
        row.status = 'duplicate';
        row.note = 'Identical file already uploaded';
      }
    }
    if (row.kind === 'form') {
      const hit = detectFormNumber(file.name);
      if (hit) {
        row.formNumber = hit.number;
        const m = mappedPoliciesFor(hit.number);
        row.mappedPolicies = m.numbers;
        row.unresolvedPolicies = m.unresolved;
        if (row.status === 'ready') {
          row.note = m.unresolved.length
            ? `Tracker: ${m.numbers.length} polic${m.numbers.length === 1 ? 'y' : 'ies'} · ${m.unresolved.join(', ')} not in library yet`
            : `Auto-linked from tracker mapping${hit.exact ? '' : ' (padded match — verify)'}`;
        }
      } else if (row.status === 'ready') {
        row.note = 'No tracker form number in the filename — will need cataloguing';
      }
    }
    if (row.kind !== 'form') {
      const m = matchPolicy(file.name);
      row.targetIdx = m.idx;
      if (m.note && row.status === 'ready') row.note = m.note;
      if (m.idx === null && row.status === 'ready') { row.status = 'needs_match'; row.note = m.note; }
    }
    QUEUE.push(row);
    added++;
  }
  renderQueue();
  toast(skipped ? `${added} queued · ${skipped} skipped (batch limit)` : `${added} file${added === 1 ? '' : 's'} queued`);
}

function autoMatchAll() {
  QUEUE.forEach(r => {
    if (r.status === 'done' || r.kind === 'form') return;
    const m = matchPolicy(r.name);
    r.targetIdx = m.idx;
    if (m.idx === null) { r.status = 'needs_match'; r.note = m.note; }
    else if (r.status === 'needs_match') { r.status = 'ready'; r.note = m.note; }
  });
  renderQueue();
  toast('Auto-match re-run across the queue');
}

const STATUS_CHIP = {
  ready: ['good', 'Ready'], done: ['good', 'Ingested'], duplicate: ['pending', 'Duplicate'],
  quarantine: ['pending', 'Quarantined'], needs_match: ['pending', 'Needs match'],
  rejected: ['overdue', 'Rejected'], uploading: ['pending', 'Uploading'], failed: ['overdue', 'Failed']
};

function targetLabel(row) {
  if (row.kind === 'form') {
    if (!row.formNumber) return '<span class="subtle">Uncatalogued form</span>';
    const resolved = (row.mappedPolicies || []).filter(n => policyExists(n));
    return `<b>Form ${esc(row.formNumber)}</b><div class="subtle">${resolved.length ? esc(resolved.join(', ')) : 'no live policy'}${(row.unresolvedPolicies || []).length ? ` · <span class="required">${esc(row.unresolvedPolicies.join(', '))} pending</span>` : ''}</div>`;
  }
  if (row.targetIdx === null || row.targetIdx === undefined) return '<span class="subtle">— unmatched —</span>';
  const p = POLICIES[row.targetIdx];
  return `<b>${esc(p.policy)}</b> · ${esc(p.title)}<div class="subtle">${esc(p.section)}</div>`;
}

function renderQueue() {
  const host = byId('uploadQueue');
  const total = QUEUE.reduce((a, r) => a + r.file.size, 0);
  const ready = QUEUE.filter(r => r.status === 'ready').length;
  const flagged = QUEUE.filter(r => ['rejected','duplicate','quarantine','needs_match','failed'].includes(r.status)).length;
  byId('batchCount').textContent = QUEUE.length;
  byId('batchSize').textContent = fmtSize(total);
  byId('batchReady').textContent = ready;
  byId('batchFlagged').textContent = flagged;
  byId('startUploadBtn').disabled = !ready || uploading;
  host.innerHTML = QUEUE.length ? QUEUE.map(r => {
    const [cls, label] = STATUS_CHIP[r.status] || ['pending', r.status];
    return `<tr id="qrow-${r.id}"><td><div class="filename">${esc(r.name)}</div>${r.stage ? `<div class="subtle">${esc(r.stage)}</div><div class="miniprogress"><span style="width:${r.progress}%"></span></div>` : ''}</td>
<td><select class="rowselect" onchange="setKind(${r.id}, this.value)" ${r.status === 'done' ? 'disabled' : ''}>${['policy','form','attachment'].map(k => `<option value="${k}" ${r.kind === k ? 'selected' : ''}>${k === 'policy' ? 'Policy document' : k === 'form' ? 'Form template' : 'Attachment'}</option>`).join('')}</select></td>
<td>${esc(fmtSize(r.file.size))}<div class="subtle">.${esc(r.ext)}</div></td>
<td id="qtarget-${r.id}">${targetLabel(r)}${r.status === 'done' || r.kind === 'form' ? '' : `<div><button class="btn outline" style="padding:4px 8px;font-size:11px;margin-top:5px" onclick="changeTarget(${r.id})">Change</button></div>`}</td>
<td><span class="status ${cls}">${esc(label)}</span>${r.note ? `<div class="subtle">${esc(r.note)}</div>` : ''}</td>
<td>${r.status === 'done' ? '' : `<button class="btn outline" style="padding:4px 8px;font-size:11px" onclick="removeRow(${r.id})">Remove</button>`}</td></tr>`;
  }).join('') : '<tr><td colspan="6" class="subtle" style="text-align:center;padding:26px">No files queued yet.</td></tr>';
}

function setKind(id, kind) {
  const r = QUEUE.find(x => x.id === id);
  if (!r) return;
  r.kind = kind;
  if (kind === 'form') { r.targetIdx = null; if (r.status === 'needs_match') { r.status = 'ready'; r.note = ''; } }
  else if (r.targetIdx === null) { const m = matchPolicy(r.name); r.targetIdx = m.idx; r.status = m.idx === null ? 'needs_match' : 'ready'; r.note = m.note; }
  renderQueue();
}

function changeTarget(id) {
  const r = QUEUE.find(x => x.id === id);
  if (!r) return;
  const cell = byId(`qtarget-${id}`);
  const opts = POLICIES.map((p, i) => `<option value="${i}" ${i === r.targetIdx ? 'selected' : ''}>${esc(p.policy)} · ${esc(p.title)}</option>`).join('');
  cell.innerHTML = `<select class="rowselect" onchange="setTarget(${id}, this.value)"><option value="">— unmatched —</option>${opts}</select>`;
  cell.querySelector('select').focus();
}
function setTarget(id, value) {
  const r = QUEUE.find(x => x.id === id);
  if (!r) return;
  r.targetIdx = value === '' ? null : Number(value);
  if (r.targetIdx === null) { r.status = 'needs_match'; r.note = 'No policy match — choose one'; }
  else if (['needs_match','ready'].includes(r.status)) { r.status = 'ready'; r.note = 'Manually matched'; }
  renderQueue();
}
function removeRow(id) {
  QUEUE = QUEUE.filter(r => r.id !== id);
  renderQueue();
}

/* Simulates the server pipeline: each ready file walks the stages with a
   bounded number in flight, exactly like the worker would. */
const wait = ms => new Promise(res => setTimeout(res, ms));

async function processRow(r) {
  r.status = 'uploading';
  for (let i = 0; i < PIPELINE_STAGES.length; i++) {
    r.stage = PIPELINE_STAGES[i];
    r.progress = Math.round((i + 1) / PIPELINE_STAGES.length * 100);
    renderQueue();
    await wait(140 + Math.round(i * 40));
  }
  r.status = 'done';
  r.stage = 'Ready for review';
  INGESTED.add(r.fp);
  if (r.kind === 'form') r.formNumber ? registerMappedForm(r) : addDraftForm(r);
  if (r.kind !== 'form' && r.targetIdx !== null) addUploadedVersion(r.targetIdx, r);
  renderQueue();
}

async function startUpload() {
  if (uploading) return;
  const batch = QUEUE.filter(r => r.status === 'ready');
  if (!batch.length) { toast('Nothing in the queue is ready to ingest'); return; }
  uploading = true;
  byId('startUploadBtn').disabled = true;
  byId('uploadStatus').textContent = `Ingesting ${batch.length} file${batch.length === 1 ? '' : 's'}…`;
  let cursor = 0;
  const worker = async () => { while (cursor < batch.length) await processRow(batch[cursor++]); };
  await Promise.all(Array.from({length: Math.min(UPLOAD_RULES.concurrency, batch.length)}, worker));
  uploading = false;
  const done = QUEUE.filter(r => r.status === 'done').length;
  const flagged = QUEUE.filter(r => ['rejected','duplicate','quarantine','needs_match','failed'].includes(r.status)).length;
  byId('uploadStatus').textContent = `${done} ingested · ${flagged} still need attention`;
  renderQueue();
  renderPolicyTable();
  renderTOC();
  renderForms();
  if (currentSection) renderTocPolicyList();
  toast(`${done} document${done === 1 ? '' : 's'} ingested — pending review`);
}

/* drag and drop over the whole zone */
document.addEventListener('DOMContentLoaded', () => {
  const dz = byId('dropzone');
  if (!dz) return;
  ['dragenter','dragover'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.add('dragover'); }));
  ['dragleave','drop'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove('dragover'); }));
  dz.addEventListener('drop', e => { if (e.dataTransfer && e.dataTransfer.files) queueFiles(e.dataTransfer.files); });
});


/* ================================================================= viewer
   Opening a controlled document. Files uploaded in this session have real
   bytes, so they render for real (PDF in a frame, images, text). Seed
   records have no file attached, so the viewer shows the controlled-copy
   record sheet instead of pretending to render one.
   ======================================================================== */

let docObjectUrl = null;
let docPrintable = null;   // {blob, filename} for download/print

function closeDoc() {
  byId('docModal').classList.remove('show');
  if (docObjectUrl) { URL.revokeObjectURL(docObjectUrl); docObjectUrl = null; }
  docPrintable = null;
}

function renderDocDetails(d) {
  const rows = d.meta.map(([label, value]) => `<dt>${esc(label)}</dt><dd>${value}</dd>`).join('');
  const links = (d.linkedPolicies || []).map(i => {
    const p = POLICIES[i];
    return `<button class="doclink" onclick="closeDoc();openPolicy(${i})">${esc(p.policy)} · ${esc(p.title)}</button>`;
  }).join('');
  const versions = (d.versions || []).map(v =>
    `<div class="versionrow"><div><b>${esc(v.label)}</b><div class="subtle">${esc(v.note)}</div></div><span class="status ${v.cls}">${esc(v.state)}</span></div>`).join('');
  return `<dl class="docmeta">${rows}</dl>
${links ? `<dt class="docmeta" style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-top:13px">Linked policies</dt><div class="doclinks">${links}</div>` : ''}
${versions ? `<div style="margin-top:15px"><div class="panelhead" style="margin-bottom:4px"><h4 style="font-size:14px">Version history</h4></div>${versions}</div>` : ''}`;
}

/* Renders the actual file when we have it; otherwise an honest placeholder. */
function renderDocPreview(d) {
  const host = byId('docPreview');
  if (!d.file) { host.innerHTML = d.placeholder; return; }
  docObjectUrl = URL.createObjectURL(d.file);
  docPrintable = {url: docObjectUrl, filename: d.file.name};
  const ext = (d.file.name.split('.').pop() || '').toLowerCase();
  if (ext === 'pdf') {
    host.innerHTML = `<iframe class="docframe" src="${docObjectUrl}" title="${esc(d.file.name)}"></iframe>`;
  } else if (['png','jpg','jpeg','tif','tiff'].includes(ext)) {
    host.innerHTML = `<img class="docimage" src="${docObjectUrl}" alt="${esc(d.file.name)}">`;
  } else if (['txt','md','csv'].includes(ext)) {
    host.innerHTML = '<div class="doctext">Loading…</div>';
    d.file.text().then(t => { host.innerHTML = `<div class="doctext">${esc(t.slice(0, 20000))}</div>`; });
  } else {
    // .docx/.xlsx: production converts these to PDF on ingest (LibreOffice headless)
    host.innerHTML = `<div class="paper"><div class="paperhead"><h4>${esc(d.file.name)}</h4><div class="subtle">${esc(fmtSize(d.file.size))} · .${esc(ext)}</div></div>
<p><b>No inline preview for this format in the prototype.</b></p>
<p>On ingest the server converts Office formats to a display PDF (LibreOffice headless, step 8 of the pipeline) and staff read that rendition — the original is retained but never served for reading. The uploaded file is intact here: use <b>Download</b> to open it in Word or Excel.</p></div>`;
  }
}

function openDocViewer(d) {
  byId('docTitle').textContent = d.title;
  byId('docSubtitle').textContent = d.subtitle;
  byId('docDetails').innerHTML = renderDocDetails(d);
  renderDocPreview(d);
  byId('docDownload').disabled = !d.file;
  byId('docDownload').title = d.file ? 'Download this file' : 'No file attached to this seed record';
  byId('docModal').classList.add('show');
}

function downloadDoc() {
  if (!docPrintable) { toast('This record has no file attached in the prototype'); return; }
  const a = document.createElement('a');
  a.href = docPrintable.url;
  a.download = docPrintable.filename;
  a.click();
  toast(`Downloading ${docPrintable.filename}`);
}
function printDoc() {
  const frame = document.querySelector('#docPreview iframe');
  if (frame && frame.contentWindow) { frame.contentWindow.focus(); frame.contentWindow.print(); return; }
  window.print();
}

/* Controlled form from the seed library — no bytes, so show the record sheet. */
function openForm(formId) {
  const f = CONTROLLED_FORMS.find(x => x.id === formId);
  if (!f) { toast('Form not found'); return; }
  const linked = (f.policies || [])
    .map(num => POLICIES.findIndex(p => p.policy === String(num)))
    .filter(i => i >= 0);
  openDocViewer({
    title: `${f.id} · ${f.name}`,
    subtitle: `${f.version} · ${f.file} · Owner: ${f.owner}`,
    file: f.blob || null,
    linkedPolicies: linked,
    meta: [
      ['Status', '<span class="status good">Current controlled version</span>'],
      ['Risk level', riskBadge(f.risk)],
      ['Source file', esc(f.file)],
      ['Assigned roles', f.roles.length ? esc(f.roles.join(', ')) : '<span class="subtle">None assigned</span>'],
      ['Departments', f.departments.length ? esc(f.departments.join(', ')) : '<span class="subtle">None assigned</span>'],
      ['Facilities', esc(f.facilities.join(', '))],
      ['Notification rule', esc(f.notify)]
    ],
    versions: [
      {label: f.version, note: f.blob ? 'Published — current controlled version' : 'On record — document not yet uploaded', state: 'Current', cls: 'good'},
      ...(f.priorVersions || []).map(v => ({label: v.label, note: `Superseded ${v.at}`, state: 'Superseded', cls: 'pending'}))
    ],
    placeholder: `<div class="paper"><div class="watermark">CONTROLLED COPY</div>
<div class="paperhead"><h4>${esc(f.name)}</h4><div class="subtle">Form ${esc(f.id)} · ${esc(f.version)} · Freedom Behavioral Health</div></div>
<p><b>This is a seed record — no file is attached in the prototype.</b> Once ${esc(f.file)} is uploaded through Bulk Upload, this pane renders the controlled PDF itself, served by a short-lived signed URL and logged to the audit trail.</p>
<p>The form is issued to <b>${esc(f.roles.join(', ') || 'no roles yet')}</b> across ${esc(f.facilities.join(', '))}, under the rule <b>${esc(f.notify)}</b>.</p>
<div class="fieldline"></div><div class="subtle">Patient / unit</div>
<div class="fieldline"></div><div class="subtle">Completed by</div>
<div class="fieldline"></div><div class="subtle">Date · Signature</div>
<p class="subtle" style="margin-top:18px">Obsolete versions are watermarked SUPERSEDED and cannot be assigned.</p></div>`
  });
}

/* A specific version of a policy document — real bytes when it was uploaded
   in this session, the record sheet when it is the imported baseline. */
function openVersionDoc(policyIdx, versionId) {
  const v = versionsFor(policyIdx).find(x => x.id === versionId);
  if (!v) { toast('Version not found'); return; }
  const p = POLICIES[policyIdx];
  const state = {published: ['good', 'Current controlled version'], pending: ['pending', 'Pending review — not published'], superseded: ['pending', 'Superseded — retained for audit']}[v.status];
  openDocViewer({
    title: v.filename || `${p.policy} · ${p.title}`,
    subtitle: `${v.label} · ${p.policy} · ${p.title}`,
    file: v.file,
    linkedPolicies: [policyIdx],
    meta: [
      ['Status', `<span class="status ${state[0]}">${state[1]}</span>`],
      ['Version', esc(v.label)],
      [v.at ? 'Uploaded' : 'Origin', esc(v.at ? v.at.toLocaleString() : v.by)],
      ['Size', v.size ? esc(fmtSize(v.size)) : '<span class="subtle">No file attached</span>'],
      ['Content hash', v.hash ? `<span class="vhhash">${esc(v.hash.slice(0, 32))}…</span>` : '<span class="subtle">—</span>'],
      ['Policy', `${esc(p.policy)} · ${esc(p.title)}`],
      ['Section', esc(p.section)]
    ],
    versions: versionsFor(policyIdx).map(x => ({
      label: x.label,
      note: x.note,
      state: x.status === 'published' ? 'Current' : x.status === 'pending' ? 'Pending' : 'Superseded',
      cls: x.status === 'published' ? 'good' : 'pending'
    })),
    placeholder: `<div class="paper"><div class="watermark">${v.status === 'superseded' ? 'SUPERSEDED' : 'CONTROLLED COPY'}</div><div class="paperhead"><h4>${esc(p.title)}</h4><div class="subtle">Policy ${esc(p.policy)} · ${esc(v.label)} · ${esc(p.section)}</div></div><p><b>No file attached to this version.</b> ${esc(v.note)}.</p><p>Upload the controlled document through Bulk Upload and it becomes a pending version here, rendered in this pane and publishable from the version history.</p></div>`
  });
}
/* kept for older call sites */
const openPendingUpload = (idx, i) => {
  const pending = versionsFor(idx).filter(v => v.status === 'pending');
  if (pending[i]) openVersionDoc(idx, pending[i].id);
};

function openVersionHistory(idx) {
  const p = POLICIES[idx];
  if (!p) return;
  byId('vhTitle').textContent = `Version History — ${p.policy}`;
  byId('vhSubtitle').textContent = `${p.title} · ${p.section}`;
  renderVersionHistory(idx);
  byId('versionModal').classList.add('show');
}

function renderVersionHistory(idx) {
  const rows = versionsFor(idx).slice().sort((a, b) => b.id - a.id);
  const chip = {published: ['good', 'Current'], pending: ['pending', 'Pending review'], superseded: ['pending', 'Superseded']};
  byId('vhBody').innerHTML = `<div class="subtle" style="margin-bottom:6px">${rows.length} version${rows.length === 1 ? '' : 's'} on record · newest first</div>` +
    rows.map(v => {
      const [cls, label] = chip[v.status];
      const when = v.at ? v.at.toLocaleString() : 'On record at import';
      return `<div class="vhrow ${v.status === 'published' ? 'current' : ''}">
<div class="vhlabel"><b>${esc(v.label)}</b><span class="status ${cls}">${label}</span></div>
<div><div class="vhmeta">${esc(when)} · ${esc(v.by)}</div>${v.filename ? `<div class="vhmeta">${esc(v.filename)} · ${esc(fmtSize(v.size))}</div>` : ''}<div class="vhmeta">${esc(v.note)}</div>${v.hash ? `<div class="vhhash">sha256 ${esc(v.hash.slice(0, 40))}…</div>` : ''}</div>
<div class="vhactions"><button class="btn outline" onclick="openVersionDoc(${idx}, ${v.id})">Open</button>${v.status === 'pending' && isAdmin() ? `<button class="btn primary" onclick="publishVersion(${idx}, ${v.id})">Approve &amp; Publish</button>` : ''}</div></div>`;
    }).join('');
}


/* ========================================================= forms management
   Controlled forms: create or revise a form, link it to many policies, and
   assign it to roles, departments, and facilities. Forms arriving through
   Bulk Upload land here as drafts waiting to be catalogued.
   ========================================================================= */

const DRAFT_FORMS = [];        // uploaded files not yet catalogued as controlled forms
let editingFormId = null;

const selectedValues = id => [...(byId(id)?.selectedOptions || [])].map(o => o.value);
function fillMulti(id, values) {
  const el = byId(id);
  if (el) el.innerHTML = values.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join('');
}
function selectAllMulti(id, on) {
  const el = byId(id);
  if (el) [...el.options].forEach(o => o.selected = on);
}
function setMultiSelection(id, values) {
  const el = byId(id);
  if (el) [...el.options].forEach(o => o.selected = (values || []).includes(o.value));
}

/* The policy picker is searchable because 379 options in one list is unusable. */
function renderPolicyMulti() {
  const el = byId('formPolicies');
  if (!el) return;
  const chosen = new Set([...(el.selectedOptions || [])].map(o => o.value));
  const q = (byId('policyLinkSearch')?.value || '').toLowerCase();
  const matches = POLICIES
    .filter(p => !q || (p.policy + ' ' + p.title + ' ' + p.section).toLowerCase().includes(q))
    .slice(0, 250);
  el.innerHTML = matches.map(p =>
    `<option value="${esc(p.policy)}" ${chosen.has(p.policy) ? 'selected' : ''}>${esc(p.policy)} · ${esc(p.title)}</option>`).join('');
}

function chipList(values, empty = 'None selected') {
  return values.length
    ? values.map(v => `<span class="assign-chip">${esc(v)}</span>`).join('')
    : `<span class="subtle">${empty}</span>`;
}
function renderFormAssignSummary() {
  const host = byId('formAssignSummary');
  if (!host) return;
  const pol = selectedValues('formPolicies'), roles = selectedValues('formRoles');
  const depts = selectedValues('formDepartments'), fac = selectedValues('formFacilities');
  host.innerHTML = `<div class="linkmatrix"><div><b>${pol.length}</b><span class="subtle">Policies</span></div><div><b>${roles.length}</b><span class="subtle">Roles</span></div><div><b>${depts.length}</b><span class="subtle">Departments</span></div></div>
<div class="assign-summary">${chipList(fac, 'No facility selected — defaults to Enterprise')}</div>`;
}

let pendingFormFile = null;
function handleFormFile(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const verdict = classify(file);
  if (verdict.status === 'rejected') { toast(verdict.note); input.value = ''; return; }
  pendingFormFile = file;
  byId('formFileLabel').textContent = file.name;
  if (!byId('newFormName').value) byId('newFormName').value = file.name.replace(/\.[^.]+$/, '');
  toast(verdict.status === 'quarantine' ? `${file.name} — ${verdict.note}` : 'Form selected — configure assignments');
}

function saveControlledForm() {
  const id = (byId('newFormId').value || '').trim();
  const name = (byId('newFormName').value || '').trim();
  const policies = selectedValues('formPolicies');
  if (!id || !name || !policies.length) { toast('Form ID, name, and at least one linked policy are required'); return; }
  const existing = CONTROLLED_FORMS.find(f => f.id.toLowerCase() === id.toLowerCase() && f.id !== editingFormId);
  const target = CONTROLLED_FORMS.find(f => f.id === editingFormId) || existing;
  const rec = {
    id, name,
    version: byId('newFormVersion').value || 'v1.0',
    risk: Number(byId('formRisk').value || 3),
    file: pendingFormFile ? pendingFormFile.name : (target?.file || 'Controlled form file'),
    blob: pendingFormFile || target?.blob || null,
    policies,
    roles: selectedValues('formRoles'),
    departments: selectedValues('formDepartments'),
    facilities: selectedValues('formFacilities').length ? selectedValues('formFacilities') : ['Enterprise / Corporate'],
    owner: byId('formOwnerDept').value,
    notify: byId('formNotify').value
  };
  if (target) {
    Object.assign(target, rec);
    toast(`${id} revised — ${rec.roles.length} roles and ${rec.departments.length} departments notified`);
  } else {
    CONTROLLED_FORMS.unshift(rec);
    toast(`${id} created and assigned to ${rec.policies.length} polic${rec.policies.length === 1 ? 'y' : 'ies'}`);
  }
  clearFormEditor();
  renderForms();
  renderTOC();
  renderPolicyTable();
  if (currentSection) renderTocPolicyList();
}

function clearFormEditor() {
  editingFormId = null;
  pendingFormFile = null;
  ['newFormId','newFormName','policyLinkSearch'].forEach(id => { if (byId(id)) byId(id).value = ''; });
  byId('newFormVersion').value = 'v1.0';
  byId('formRisk').value = '3';
  byId('formFileLabel').textContent = 'Touch to select or drop a form';
  byId('formEditorTitle').textContent = 'Create / Revise Controlled Form';
  ['formPolicies','formRoles','formDepartments','formFacilities'].forEach(id => selectAllMulti(id, false));
  renderPolicyMulti();
  renderFormAssignSummary();
}

function editControlledForm(id) {
  const f = CONTROLLED_FORMS.find(x => x.id === id);
  if (!f) return;
  editingFormId = f.id;
  pendingFormFile = f.blob || null;
  byId('formEditorTitle').textContent = `Revising ${f.id}`;
  byId('newFormId').value = f.id;
  byId('newFormName').value = f.name;
  byId('newFormVersion').value = f.version;
  byId('formRisk').value = String(f.risk);
  byId('formOwnerDept').value = f.owner;
  byId('formNotify').value = f.notify;
  byId('formFileLabel').textContent = f.file;
  byId('policyLinkSearch').value = '';
  renderPolicyMulti();
  // make sure linked policies are present in the (truncated) option list before selecting
  const el = byId('formPolicies');
  f.policies.forEach(num => {
    if (![...el.options].some(o => o.value === num)) {
      const p = POLICIES.find(x => x.policy === num);
      if (p) el.insertAdjacentHTML('afterbegin', `<option value="${esc(num)}">${esc(p.policy)} · ${esc(p.title)}</option>`);
    }
  });
  setMultiSelection('formPolicies', f.policies);
  setMultiSelection('formRoles', f.roles);
  setMultiSelection('formDepartments', f.departments);
  setMultiSelection('formFacilities', f.facilities);
  renderFormAssignSummary();
  window.scrollTo({top: 0, behavior: 'smooth'});
  toast(`${f.id} loaded for revision`);
}

function manageForm(id) {
  showView('forms', 'Forms Management Center');
  editControlledForm(id);
}

function deleteControlledForm(id) {
  const f = CONTROLLED_FORMS.find(x => x.id === id);
  if (!f) return;
  if (!confirm(`Retire ${f.id} · ${f.name}? It stays in the audit trail but can no longer be assigned.`)) return;
  CONTROLLED_FORMS = CONTROLLED_FORMS.filter(x => x.id !== id);
  if (editingFormId === id) clearFormEditor();
  renderForms();
  renderTOC();
  renderPolicyTable();
  if (currentSection) renderTocPolicyList();
  toast(`${f.id} retired`);
}

/* A form uploaded through Bulk Upload arrives here as a draft to catalogue. */
function addDraftForm(row) {
  DRAFT_FORMS.push({name: row.name, size: row.file.size, file: row.file, at: new Date().toLocaleString()});
}
function catalogueDraft(i) {
  const d = DRAFT_FORMS[i];
  if (!d) return;
  showView('forms', 'Forms Management Center');
  clearFormEditor();
  pendingFormFile = d.file;
  byId('formFileLabel').textContent = d.name;
  const guessId = (d.name.match(/FRM[-_][A-Za-z0-9-]+/i) || [])[0] || '';
  byId('newFormId').value = guessId.toUpperCase();
  byId('newFormName').value = d.name.replace(/\.[^.]+$/, '').replace(/FRM[-_][A-Za-z0-9-]+\s*/i, '').trim();
  const num = (d.name.match(/\b(\d{3,5})\b/) || [])[1];
  if (num && POLICIES.some(p => p.policy === num)) {
    byId('policyLinkSearch').value = num;
    renderPolicyMulti();
    setMultiSelection('formPolicies', [num]);
  }
  renderFormAssignSummary();
  toast('Draft loaded — set the ID, links, and audience, then save');
}
function dismissDraft(i) {
  DRAFT_FORMS.splice(i, 1);
  renderForms();
  toast('Draft dismissed');
}

function renderForms() {
  const host = byId('formsList');
  if (!host) return;
  const q = (byId('formSearch')?.value || '').toLowerCase();
  const risk = byId('formRiskFilter')?.value || '';
  const rows = CONTROLLED_FORMS.filter(f =>
    (!risk || String(f.risk) === risk) &&
    (!q || [f.id, f.name, f.owner, f.file, ...(f.policies || []), ...(f.roles || []), ...(f.departments || [])]
      .join(' ').toLowerCase().includes(q)));
  byId('formCount').textContent = `${rows.length} form${rows.length === 1 ? '' : 's'}`;
  byId('formNavCount').textContent = CONTROLLED_FORMS.length;
  renderMappingCoverage();

  byId('draftForms').innerHTML = DRAFT_FORMS.length
    ? `<div class="subtle" style="margin-bottom:5px"><b>${DRAFT_FORMS.length}</b> uploaded file${DRAFT_FORMS.length === 1 ? '' : 's'} waiting to be catalogued</div>` +
      DRAFT_FORMS.map((d, i) => `<div class="formcard draftcard"><div class="formcard-top"><div><h5>${esc(d.name)}</h5><div class="subtle">${esc(fmtSize(d.size))} · uploaded ${esc(d.at)} · not yet a controlled form</div></div><span class="status pending">Draft</span></div><div style="display:flex;justify-content:flex-end;gap:7px;margin-top:9px"><button class="btn outline touchbtn" onclick="dismissDraft(${i})">Dismiss</button><button class="btn primary touchbtn" onclick="catalogueDraft(${i})">Catalogue Form</button></div></div>`).join('')
    : '';

  host.innerHTML = rows.length ? rows.map(f => {
    const linked = (f.policies || []).map(num => {
      const i = POLICIES.findIndex(p => p.policy === String(num));
      return i >= 0
        ? `<button class="doclink" onclick="openPolicy(${i})">${esc(num)} · ${esc(POLICIES[i].title)}</button>`
        : `<span class="assign-chip">${esc(num)}</span>`;
    }).join('');
    return `<div class="formcard"><div class="formcard-top"><div><h5>${esc(f.id)} · ${esc(f.name)}</h5><div class="subtle">${esc(f.version)} · ${esc(f.file)} · Owner: ${esc(f.owner)}</div></div>${riskBadge(f.risk)}</div>
<div class="linkmatrix"><div><b>${f.policies.length}</b><span class="subtle">Linked policies</span></div><div><b>${f.roles.length}</b><span class="subtle">Assigned roles</span></div><div><b>${f.facilities.length}</b><span class="subtle">Facilities</span></div></div>
<div class="doclinks" style="margin-top:8px">${linked}</div>
<div class="assign-summary">${f.roles.slice(0, 4).map(r => `<span class="assign-chip">${esc(r)}</span>`).join('')}${f.roles.length > 4 ? `<span class="assign-chip">+${f.roles.length - 4} more roles</span>` : ''}</div>
<div class="subtle" style="margin-top:7px">${esc(f.notify)}</div>
<div style="display:flex;justify-content:flex-end;gap:7px;margin-top:10px"><button class="btn outline touchbtn" onclick="deleteControlledForm('${esc(f.id)}')">Retire</button><button class="btn outline touchbtn" onclick="editControlledForm('${esc(f.id)}')">Edit / Reassign</button><button class="btn primary touchbtn" onclick="openForm('${esc(f.id)}')">Open Form</button></div></div>`;
  }).join('') : '<div class="subtle" style="padding:30px;text-align:center">No forms match the current filters.</div>';
}


/* ===================================================== policy assignments
   Two halves of one feature: admins write rules that target an audience by
   facility / department / role, and each rule materializes one assignment
   per matching employee. Staff see their own required reading and
   acknowledge it. Mirrors assignment_rule / assignment / acknowledgement
   in db/schema.sql.
   ======================================================================== */

const EMPLOYEES = [
  {id:'FB-10001', first:'Bren', last:'Roberts', email:'broberts@freedomhc.com', facility:'Enterprise / Corporate', departments:['Administration','IT / Security'], roles:['IT / Systems Administrator'], securityRole:'System Administrator', status:'Active'},
  {id:'FB-10002', first:'S.', last:'Chisholm', email:'schisholm@freedomhc.com', facility:'Enterprise / Corporate', departments:['Administration'], roles:[], securityRole:'System Administrator', status:'Active'},
  {id:'FB-10003', first:'J.', last:'Reed', email:'jreed@freedomhc.com', facility:'Enterprise / Corporate', departments:['Administration'], roles:[], securityRole:'System Administrator', status:'Active'},
  /* Facility accounts (shared mailboxes, @freedombehavioral.com). Seeded as
     Manager — see README: raise to Policy Administrator if they should be
     able to upload and publish for their site. */
  {id:'FB-20001', first:'Plainview', last:'Administrator', email:'Plainviewadmin@freedombehavioral.com', facility:'Freedom Plainview', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20002', first:'Ville Platte', last:'PA', email:'villeplattepa@freedombehavioral.com', facility:'Freedom Ville Platte', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20003', first:'DeQuincy', last:'PA', email:'dequincypa@freedombehavioral.com', facility:'Freedom DeQuincy', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20004', first:'Minden', last:'PA', email:'Mindenpa@freedombehavioral.com', facility:'Freedom Minden', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20005', first:'Bastrop', last:'Administrator', email:'bastropadmin@freedombehavioral.com', facility:'Freedom Bastrop', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20006', first:'Bunkie', last:'Administrator', email:'bunkieadmin@freedombehavioral.com', facility:'Freedom Bunkie', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20007', first:'Ferriday', last:'Administrator', email:'ferridayadmin@freedombehavioral.com', facility:'Freedom Ferriday', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20008', first:'Magnolia', last:'Administrator', email:'magnoliaadmin@freedombehavioral.com', facility:'Freedom Magnolia', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20009', first:'Greenville', last:'Administrator', email:'greenvilleadmin@freedombehavioral.com', facility:'Freedom Greenville', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20010', first:'Monroe', last:'Administrator', email:'monroeadmin@freedombehavioral.com', facility:'Freedom Monroe', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20011', first:'West Monroe', last:'Administrator', email:'westmonroeadmin@freedombehavioral.com', facility:'Freedom West Monroe', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20012', first:'Leesville', last:'Administrator', email:'leesvilleadmin@freedombehavioral.com', facility:'Freedom Leesville', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-20013', first:'Lake Charles', last:'Administrator', email:'lakecharlesadmin@freedombehavioral.com', facility:'Freedom Lake Charles', departments:['Administration'], roles:['Hospital Administrator'], securityRole:'Manager', shared:true, status:'Active'},
  {id:'FB-10482', first:'Morgan', last:'Reed', email:'morgan.reed@freedombehavioral.com', facility:'Freedom Lake Charles', departments:['Nursing'], roles:['Registered Nurse'], securityRole:'Employee', status:'Active'},
  {id:'FB-10614', first:'Taylor', last:'Brooks', email:'taylor.brooks@freedombehavioral.com', facility:'Freedom Monroe', departments:['Nursing'], roles:['Behavioral Health Technician / MHT'], securityRole:'Employee', status:'Active'},
  {id:'FB-10133', first:'Casey', last:'Martin', email:'casey.martin@freedombehavioral.com', facility:'Freedom DeQuincy', departments:['Quality / Performance Improvement','Compliance / Risk'], roles:['Quality / Performance Improvement Director'], securityRole:'Policy Owner', status:'Active'},
  {id:'FB-10220', first:'Avery', last:'Nguyen', email:'avery.nguyen@freedombehavioral.com', facility:'Freedom Monroe', departments:['Nursing'], roles:['Director of Nursing'], securityRole:'Manager', status:'Active'},
  {id:'FB-10318', first:'Riley', last:'Thompson', email:'riley.thompson@freedombehavioral.com', facility:'Freedom Leesville', departments:['Clinical / Therapy'], roles:['Therapist / LCSW / LPC'], securityRole:'Employee', status:'Active'},
  {id:'FB-10405', first:'Jamie', last:'Fontenot', email:'jamie.fontenot@freedombehavioral.com', facility:'Freedom Lake Charles', departments:['Pharmacy / Medication Management'], roles:['Pharmacy Director / Pharmacist'], securityRole:'Manager', status:'Active'},
  {id:'FB-10511', first:'Drew', last:'Landry', email:'drew.landry@freedombehavioral.com', facility:'Freedom Minden', departments:['Environment of Care','Life Safety'], roles:['Environment of Care / Safety Officer'], securityRole:'Policy Owner', status:'Active'},
  {id:'FB-10627', first:'Sam', last:'Guidry', email:'sam.guidry@freedombehavioral.com', facility:'Freedom Bunkie', departments:['Transportation'], roles:['Transportation / Driver'], securityRole:'Employee', status:'Active'},
  {id:'FB-10704', first:'Quinn', last:'Adams', email:'quinn.adams@freedombehavioral.com', facility:'Freedom Greenville', departments:['HIM / Medical Records'], roles:['HIM / Medical Records Director'], securityRole:'Policy Owner', status:'Active'},
  {id:'FB-10812', first:'Alex', last:'Boudreaux', email:'alex.boudreaux@freedombehavioral.com', facility:'Freedom Plainview', departments:['Human Resources'], roles:['Human Resources Director'], securityRole:'Policy Administrator', status:'Active'},
  {id:'FB-10905', first:'Peyton', last:'Hebert', email:'peyton.hebert@freedombehavioral.com', facility:'Freedom Ferriday', departments:['Central Intake / Admissions'], roles:['Intake Coordinator'], securityRole:'Employee', status:'Active'},
  {id:'FB-11002', first:'Reese', last:'Doucet', email:'reese.doucet@freedombehavioral.com', facility:'Freedom Bastrop', departments:['Nursing'], roles:['Registered Nurse'], securityRole:'Employee', status:'Active'},
  {id:'FB-11110', first:'Skyler', last:'Comeaux', email:'skyler.comeaux@freedombehavioral.com', facility:'Freedom Ville Platte', departments:['Dietary'], roles:['Dietary Director'], securityRole:'Manager', status:'Inactive'}
];
const CURRENT_USER_ID = 'FB-10001';
const currentUser = () => EMPLOYEES.find(e => e.id === CURRENT_USER_ID);

const RULES = [];
const ASSIGNMENTS = [];   // {id, ruleId, userId, policyIdx, formId, dueOn, status, ackAt}
let ruleSeq = 0, assignSeq = 0, editingRuleId = null;

const overlaps = (a, b) => a.some(x => b.includes(x));
const dayMs = 86400000;
const addDays = n => new Date(Date.now() + n * dayMs);
const fmtDate = d => d.toLocaleDateString(undefined, {month: 'short', day: '2-digit'});

/* Which employees a rule targets. An empty list means "all". */
function matchEmployees(rule) {
  return EMPLOYEES.filter(e => e.status === 'Active'
    && (!rule.facilities.length || rule.facilities.includes(e.facility))
    && (!rule.departments.length || overlaps(rule.departments, e.departments))
    && (!rule.roles.length || overlaps(rule.roles, e.roles)));
}

/* A rule can name one policy, a whole TOC section, or a risk band. */
function rulePolicyIndexes(rule) {
  if (rule.subject === 'policy') return rule.policyIdx === null ? [] : [rule.policyIdx];
  if (rule.subject === 'section') return POLICIES.map((p, i) => ({p, i})).filter(x => x.p.section === rule.section).map(x => x.i);
  if (rule.subject === 'risk') return POLICIES.map((p, i) => ({p, i})).filter(x => x.p.risk === Number(rule.risk)).map(x => x.i);
  return [];
}

function ruleSubjectLabel(rule) {
  if (rule.subject === 'policy') {
    const p = POLICIES[rule.policyIdx];
    return p ? `${p.policy} · ${p.title}` : 'Policy';
  }
  if (rule.subject === 'section') return `All policies in ${rule.section}`;
  if (rule.subject === 'risk') return `All Risk ${rule.risk} policies`;
  const f = CONTROLLED_FORMS.find(x => x.id === rule.formId);
  return f ? `Form ${f.id} · ${f.name}` : 'Controlled form';
}

function materialize(rule) {
  if (!rule.active) return 0;
  const people = matchEmployees(rule);
  const policies = rulePolicyIndexes(rule);
  let created = 0;
  people.forEach(e => {
    if (rule.subject === 'form') {
      if (!ASSIGNMENTS.some(a => a.userId === e.id && a.formId === rule.formId)) {
        ASSIGNMENTS.push({id: ++assignSeq, ruleId: rule.id, userId: e.id, policyIdx: null, formId: rule.formId, dueOn: addDays(rule.dueDays), status: 'open', ackAt: null});
        created++;
      }
    } else {
      policies.forEach(idx => {
        if (!ASSIGNMENTS.some(a => a.userId === e.id && a.policyIdx === idx)) {
          ASSIGNMENTS.push({id: ++assignSeq, ruleId: rule.id, userId: e.id, policyIdx: idx, formId: null, dueOn: addDays(rule.dueDays), status: 'open', ackAt: null});
          created++;
        }
      });
    }
  });
  return created;
}

/* Seed rules so the page opens with a realistic picture, including a few
   assignments already acknowledged and one deliberately past due. */
function seedAssignments() {
  [
    {subject: 'risk', risk: 5, facilities: [], departments: [], roles: [], dueDays: 3, requiresAck: true, delivery: 'Portal + Email + Acknowledgement Required', name: 'Risk 5 — all staff'},
    {subject: 'section', section: 'MEDICATION MANAGEMENT', facilities: [], departments: ['Nursing','Pharmacy / Medication Management'], roles: [], dueDays: 7, requiresAck: true, delivery: 'Portal + Email + Acknowledgement Required', name: 'Medication Management — Nursing & Pharmacy'},
    {subject: 'section', section: 'PATIENT RIGHTS', facilities: [], departments: ['Compliance / Risk'], roles: [], dueDays: 5, requiresAck: true, delivery: 'Portal + Email', name: 'Patient Rights — Compliance'}
  ].forEach(r => {
    const rule = {id: ++ruleSeq, active: true, policyIdx: null, formId: null, section: null, risk: null, ...r};
    RULES.push(rule);
    materialize(rule);
  });
  // a plausible starting state rather than a wall of untouched rows
  ASSIGNMENTS.forEach((a, i) => {
    if (i % 3 === 0) { a.status = 'acknowledged'; a.ackAt = new Date(Date.now() - (i % 9) * dayMs); }
    else if (i % 7 === 0) a.dueOn = new Date(Date.now() - 2 * dayMs);
  });
}

const isOverdue = a => a.status === 'open' && a.dueOn < new Date();

function renderAssignments() {
  const active = RULES.filter(r => r.active);
  const covered = new Set(ASSIGNMENTS.map(a => a.userId));
  const acked = ASSIGNMENTS.filter(a => a.status === 'acknowledged').length;
  byId('kpiRules').textContent = active.length;
  byId('kpiCovered').textContent = covered.size;
  byId('kpiRoster').textContent = EMPLOYEES.filter(e => e.status === 'Active').length;
  byId('kpiAssignments').textContent = ASSIGNMENTS.length;
  byId('kpiAckRate').textContent = ASSIGNMENTS.length ? Math.round(acked / ASSIGNMENTS.length * 100) + '%' : '0%';
  byId('kpiAckCount').textContent = acked;
  byId('kpiOverdue').textContent = ASSIGNMENTS.filter(isOverdue).length;
  byId('assignNavCount').textContent = ASSIGNMENTS.filter(a => a.userId === CURRENT_USER_ID && a.status === 'open').length;
  renderRules();
  renderMyAssignments();
  renderRulePreview();
}

function showAssignTab(tab) {
  showView('assign', 'Policy Assignment Center');
  const rules = tab === 'rules';
  byId('assignRulesTab').style.display = rules ? '' : 'none';
  byId('assignMineTab').style.display = rules ? 'none' : '';
  byId('tabRules').classList.toggle('active', rules);
  byId('tabMine').classList.toggle('active', !rules);
}

function onRuleSubjectChange() {
  const v = byId('ruleSubject').value;
  byId('ruleSubjectPolicyWrap').style.display = v === 'policy' ? '' : 'none';
  byId('ruleSubjectSectionWrap').style.display = v === 'section' ? '' : 'none';
  byId('ruleSubjectRiskWrap').style.display = v === 'risk' ? '' : 'none';
  byId('ruleSubjectFormWrap').style.display = v === 'form' ? '' : 'none';
  if (v === 'form') byId('ruleSubjectForm').innerHTML = CONTROLLED_FORMS.map(f => `<option value="${esc(f.id)}">${esc(f.id)} · ${esc(f.name)}</option>`).join('');
  renderRulePreview();
}

function renderRuleSubjectPolicies() {
  const el = byId('ruleSubjectPolicy');
  if (!el) return;
  const q = (byId('ruleSubjectSearch')?.value || '').toLowerCase();
  const chosen = el.value;
  el.innerHTML = POLICIES.map((p, i) => ({p, i}))
    .filter(({p}) => !q || (p.policy + ' ' + p.title + ' ' + p.section).toLowerCase().includes(q))
    .slice(0, 250)
    .map(({p, i}) => `<option value="${i}" ${String(i) === chosen ? 'selected' : ''}>${esc(p.policy)} · ${esc(p.title)}</option>`).join('');
}

function readRuleForm() {
  const subject = byId('ruleSubject').value;
  return {
    subject,
    policyIdx: subject === 'policy' && byId('ruleSubjectPolicy').value !== '' ? Number(byId('ruleSubjectPolicy').value) : null,
    section: subject === 'section' ? byId('ruleSubjectSection').value : null,
    risk: subject === 'risk' ? byId('ruleSubjectRisk').value : null,
    formId: subject === 'form' ? byId('ruleSubjectForm').value : null,
    facilities: selectedValues('ruleFacilities'),
    departments: selectedValues('ruleDepartments'),
    roles: selectedValues('ruleRoles'),
    dueDays: Math.max(1, Number(byId('ruleDueDays').value || 3)),
    requiresAck: byId('ruleRequiresAck').checked,
    delivery: byId('ruleDelivery').value,
    active: true
  };
}

function renderRulePreview() {
  const host = byId('rulePreview');
  if (!host) return;
  const draft = readRuleForm();
  const people = matchEmployees(draft);
  const policies = draft.subject === 'form' ? [] : rulePolicyIndexes(draft);
  const count = draft.subject === 'form' ? people.length : people.length * policies.length;
  host.innerHTML = `<div class="grouplabel">Rule preview</div><div class="linkmatrix"><div><b>${draft.subject === 'form' ? 1 : policies.length}</b><span class="subtle">${draft.subject === 'form' ? 'Form' : 'Policies'}</span></div><div><b>${people.length}</b><span class="subtle">Employees matched</span></div><div><b>${count}</b><span class="subtle">Assignments</span></div></div>
<div class="subtle" style="margin-top:7px">${esc(ruleSubjectLabel(draft))} · due in ${draft.dueDays} day${draft.dueDays === 1 ? '' : 's'}${draft.requiresAck ? ' · acknowledgement required' : ' · read only, no acknowledgement'}</div>
<div class="assign-summary">${people.slice(0, 5).map(e => `<span class="assign-chip">${esc(e.first)} ${esc(e.last)} · ${esc(e.roles[0] || '')}</span>`).join('')}${people.length > 5 ? `<span class="assign-chip">+${people.length - 5} more</span>` : ''}${!people.length ? '<span class="subtle">No active employee matches this audience</span>' : ''}</div>`;
}

function saveAssignmentRule() {
  const draft = readRuleForm();
  if (draft.subject === 'policy' && draft.policyIdx === null) { toast('Select a policy to assign'); return; }
  if (draft.subject === 'form' && !draft.formId) { toast('Select a controlled form to assign'); return; }
  if (!matchEmployees(draft).length) { toast('That audience matches no active employees'); return; }
  const existing = RULES.find(r => r.id === editingRuleId);
  let rule;
  if (existing) { Object.assign(existing, draft); rule = existing; }
  else { rule = {id: ++ruleSeq, ...draft}; RULES.push(rule); }
  const created = materialize(rule);
  clearRuleEditor();
  renderAssignments();
  toast(`Rule saved — ${created} new assignment${created === 1 ? '' : 's'} created`);
}

function clearRuleEditor() {
  editingRuleId = null;
  byId('ruleEditorTitle').textContent = 'Create Assignment Rule';
  byId('ruleSubject').value = 'policy';
  byId('ruleSubjectSearch').value = '';
  byId('ruleDueDays').value = '3';
  byId('ruleRequiresAck').checked = true;
  ['ruleFacilities','ruleDepartments','ruleRoles'].forEach(id => selectAllMulti(id, false));
  onRuleSubjectChange();
  renderRuleSubjectPolicies();
}

function editRule(id) {
  const r = RULES.find(x => x.id === id);
  if (!r) return;
  editingRuleId = id;
  byId('ruleEditorTitle').textContent = `Revising rule #${id}`;
  byId('ruleSubject').value = r.subject;
  onRuleSubjectChange();
  if (r.subject === 'policy') { renderRuleSubjectPolicies(); byId('ruleSubjectPolicy').value = String(r.policyIdx); }
  if (r.subject === 'section') byId('ruleSubjectSection').value = r.section;
  if (r.subject === 'risk') byId('ruleSubjectRisk').value = String(r.risk);
  if (r.subject === 'form') byId('ruleSubjectForm').value = r.formId;
  setMultiSelection('ruleFacilities', r.facilities);
  setMultiSelection('ruleDepartments', r.departments);
  setMultiSelection('ruleRoles', r.roles);
  byId('ruleDueDays').value = String(r.dueDays);
  byId('ruleRequiresAck').checked = r.requiresAck;
  byId('ruleDelivery').value = r.delivery;
  renderRulePreview();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

/* Deactivating withdraws only what nobody has acted on — acknowledgement
   evidence is never deleted. */
function toggleRule(id) {
  const r = RULES.find(x => x.id === id);
  if (!r) return;
  r.active = !r.active;
  if (!r.active) {
    for (let i = ASSIGNMENTS.length - 1; i >= 0; i--) {
      if (ASSIGNMENTS[i].ruleId === id && ASSIGNMENTS[i].status === 'open') ASSIGNMENTS.splice(i, 1);
    }
    toast(`Rule #${id} deactivated — outstanding assignments withdrawn, acknowledgements retained`);
  } else {
    const created = materialize(r);
    toast(`Rule #${id} reactivated — ${created} assignment${created === 1 ? '' : 's'} restored`);
  }
  renderAssignments();
}

function deleteRule(id) {
  const r = RULES.find(x => x.id === id);
  if (!r) return;
  if (!confirm(`Delete rule #${id}? Outstanding assignments are withdrawn; acknowledgements already recorded stay in the audit trail.`)) return;
  for (let i = ASSIGNMENTS.length - 1; i >= 0; i--) {
    if (ASSIGNMENTS[i].ruleId === id && ASSIGNMENTS[i].status === 'open') ASSIGNMENTS.splice(i, 1);
  }
  RULES.splice(RULES.indexOf(r), 1);
  if (editingRuleId === id) clearRuleEditor();
  renderAssignments();
  toast(`Rule #${id} deleted`);
}

function scopeChips(rule) {
  const part = (label, values) => values.length
    ? values.slice(0, 3).map(v => `<span class="scopechip">${esc(v)}</span>`).join('') + (values.length > 3 ? `<span class="scopechip">+${values.length - 3}</span>` : '')
    : `<span class="scopechip any">All ${label}</span>`;
  return part('facilities', rule.facilities) + part('departments', rule.departments) + part('roles', rule.roles);
}

function renderRules() {
  const host = byId('rulesList');
  if (!host) return;
  byId('ruleCount').textContent = `${RULES.length} rule${RULES.length === 1 ? '' : 's'}`;
  host.innerHTML = RULES.length ? RULES.map(r => {
    const mine = ASSIGNMENTS.filter(a => a.ruleId === r.id);
    const acked = mine.filter(a => a.status === 'acknowledged').length;
    const overdue = mine.filter(isOverdue).length;
    const pct = mine.length ? Math.round(acked / mine.length * 100) : 0;
    return `<div class="rulecard ${r.active ? '' : 'inactive'}"><div class="formcard-top"><div><h5>${esc(ruleSubjectLabel(r))}</h5><div class="subtle">${esc(r.delivery)} · due in ${r.dueDays} days${r.requiresAck ? '' : ' · no acknowledgement required'}</div></div><span class="status ${r.active ? 'good' : 'pending'}">${r.active ? 'Active' : 'Inactive'}</span></div>
<div class="rulescope">${scopeChips(r)}</div>
<div class="linkmatrix"><div><b>${matchEmployees(r).length}</b><span class="subtle">Employees</span></div><div><b>${mine.length}</b><span class="subtle">Assignments</span></div><div><b>${overdue}</b><span class="subtle">Past due</span></div></div>
<div class="metricbar" style="margin-top:9px"><label>Acknowledged</label><div class="progress"><span style="width:${pct}%"></span></div><small>${pct}%</small></div>
<div style="display:flex;justify-content:flex-end;gap:7px;margin-top:9px"><button class="btn outline touchbtn" onclick="deleteRule(${r.id})">Delete</button><button class="btn outline touchbtn" onclick="toggleRule(${r.id})">${r.active ? 'Deactivate' : 'Reactivate'}</button><button class="btn primary touchbtn" onclick="editRule(${r.id})">Edit Rule</button></div></div>`;
  }).join('') : '<div class="subtle" style="padding:30px;text-align:center">No assignment rules yet.</div>';
}

function whyAssigned(a) {
  const r = RULES.find(x => x.id === a.ruleId);
  if (!r) return 'Manual assignment';
  const bits = [];
  if (r.roles.length) bits.push(r.roles.join(', '));
  if (r.departments.length) bits.push(r.departments.join(', '));
  if (r.facilities.length) bits.push(r.facilities.join(', '));
  return bits.length ? bits.join(' · ') : 'All staff';
}

function renderMyAssignments() {
  const host = byId('myAssignmentRows');
  if (!host) return;
  const me = currentUser();
  byId('mineWho').textContent = `${me.first} ${me.last} · ${me.roles.join(', ')} · ${me.facility}`;
  const filter = byId('mineFilter').value;
  const all = ASSIGNMENTS.filter(a => a.userId === CURRENT_USER_ID);
  const rows = all.filter(a => filter === 'all' || (filter === 'open' ? a.status === 'open' : a.status === 'acknowledged'));
  const open = all.filter(a => a.status === 'open').length;
  const overdue = all.filter(isOverdue).length;
  byId('mineSummary').textContent = `${all.length} assigned · ${open} outstanding · ${overdue} past due · ${all.length - open} acknowledged`;
  host.innerHTML = rows.length ? rows.slice(0, 200).map(a => {
    const p = a.policyIdx !== null ? POLICIES[a.policyIdx] : null;
    const f = a.formId ? CONTROLLED_FORMS.find(x => x.id === a.formId) : null;
    const label = p ? `${esc(p.policy)} · ${esc(p.title)}` : `${esc(f?.id || 'Form')} · ${esc(f?.name || '')}`;
    const status = a.status === 'acknowledged'
      ? `<span class="status good">Acknowledged ${esc(fmtDate(a.ackAt))}</span>`
      : isOverdue(a) ? '<span class="status overdue">Past due</span>' : '<span class="status pending">Needs acknowledgement</span>';
    return `<tr><td><div class="policytitle" onclick="${p ? `openPolicy(${a.policyIdx})` : `openForm('${esc(a.formId)}')`}">${label}</div><div class="subtle">${p ? esc(p.section) : 'Controlled form'}</div></td>
<td class="assignwhy">${esc(whyAssigned(a))}</td><td>${p ? riskBadge(p.risk) : riskBadge(f?.risk || 3)}</td><td>${esc(fmtDate(a.dueOn))}</td><td>${status}</td>
<td>${a.status === 'acknowledged' ? `<button class="btn outline touchbtn" onclick="${p ? `openPolicy(${a.policyIdx})` : `openForm('${esc(a.formId)}')`}">View</button>` : `<button class="btn primary touchbtn" onclick="acknowledgeAssignment(${a.id})">Acknowledge</button>`}</td></tr>`;
  }).join('') : '<tr><td colspan="6" class="subtle" style="text-align:center;padding:24px">Nothing here — try a different filter.</td></tr>';
}

function acknowledgeAssignment(id) {
  const a = ASSIGNMENTS.find(x => x.id === id);
  if (!a || a.status === 'acknowledged') return;
  a.status = 'acknowledged';
  a.ackAt = new Date();
  renderAssignments();
  const p = a.policyIdx !== null ? POLICIES[a.policyIdx] : null;
  toast(`${p ? p.policy : a.formId} acknowledged — timestamp and version recorded`);
}

function acknowledgeAllVisible() {
  const open = ASSIGNMENTS.filter(a => a.userId === CURRENT_USER_ID && a.status === 'open');
  if (!open.length) { toast('Nothing outstanding to acknowledge'); return; }
  if (!confirm(`Acknowledge ${open.length} assignment${open.length === 1 ? '' : 's'}? Each records your name, the version, and a timestamp.`)) return;
  open.forEach(a => { a.status = 'acknowledged'; a.ackAt = new Date(); });
  renderAssignments();
  toast(`${open.length} acknowledgement${open.length === 1 ? '' : 's'} recorded`);
}


/* A form whose number appears in the tracker mapping is catalogued on
   arrival: it links itself to every policy the mapping lists, including
   policies that are not in the library yet (those attach on their own once
   the policy record exists, because links are stored by policy number). */
function registerMappedForm(row) {
  const num = row.formNumber;
  const {numbers, indexes} = mappedPoliciesFor(num);
  const name = row.name.replace(/\.[^.]+$/, '')
    .replace(new RegExp(`\\\\b0*${num.replace(/^0+/, '')}\\\\b`, 'i'), '')
    .replace(/[_-]+/g, ' ').trim() || (FORM_TITLES.get(num) || `Form ${num}`);
  const risk = indexes.length ? Math.max(...indexes.map(i => POLICIES[i].risk)) : 3;
  const existing = CONTROLLED_FORMS.find(f => f.id === num);
  const priors = existing ? [...(existing.priorVersions || []), {label: existing.version, at: new Date().toLocaleDateString()}] : [];
  const rec = {
    id: num,
    name,
    version: existing ? bumpVersion(existing.version) : 'v1.0',
    risk,
    file: row.name,
    blob: row.file,
    policies: numbers,
    roles: existing?.roles || [],
    departments: existing?.departments || [],
    facilities: existing?.facilities || ['Enterprise / Corporate'],
    owner: existing?.owner || 'Compliance / Risk',
    notify: existing?.notify || 'Portal + Email + Acknowledgement Required',
    priorVersions: priors,
    source: 'tracker mapping'
  };
  if (existing) Object.assign(existing, rec); else CONTROLLED_FORMS.unshift(rec);
}
function bumpVersion(v) {
  const n = parseFloat(String(v).replace(/^v/i, ''));
  return isNaN(n) ? 'v1.1' : 'v' + (n + 0.1).toFixed(1);
}

/* Coverage of the tracker mapping: what is loaded, uploaded, and still owed. */
function renderMappingCoverage() {
  const host = byId('mappingCoverage');
  if (!host || typeof POLICY_FORM_MAP === 'undefined') return;
  const totalForms = FORM_TO_POLICIES.size;
  const uploaded = [...FORM_TO_POLICIES.keys()].filter(n => CONTROLLED_FORMS.some(f => f.id === n)).length;
  const unresolved = unresolvedPolicyNumbers();
  const links = [...POLICY_TO_FORMS.values()].reduce((a, v) => a + v.length, 0);
  host.innerHTML = `<div class="grouplabel">Tracker mapping · ${esc(POLICY_FORM_MAP.source_workbook)}</div>
<div class="linkmatrix"><div><b>${uploaded} / ${totalForms}</b><span class="subtle">Forms uploaded</span></div><div><b>${POLICY_TO_FORMS.size}</b><span class="subtle">Mapped policies</span></div><div><b>${links}</b><span class="subtle">Policy-form links</span></div></div>
<div class="subtle" style="margin-top:7px">Upload a form whose filename contains its tracker number (e.g. <b>00158</b>) and it links itself to every policy the mapping lists — no manual cataloguing.</div>
${unresolved.length ? `<div class="subtle" style="margin-top:8px"><b>${unresolved.length} mapped policies are not in the library yet</b> — their forms will attach automatically once the policy records exist.<div class="assign-summary">${unresolved.map(n => `<span class="assign-chip">${esc(n)}</span>`).join('')}</div><button class="btn outline touchbtn" style="margin-top:8px" onclick="addMappedPolicies()">Add these ${unresolved.length} policies from the tracker</button></div>` : ''}`;
}

/* Creates library records for mapped policies the seeded tracker predates —
   titles and sections come from the mapping file, flagged as provisional. */
function addMappedPolicies() {
  const missing = unresolvedPolicyNumbers();
  if (!missing.length) return;
  if (!confirm(`Add ${missing.length} policy records from the tracker mapping? They are created as provisional records (title and section from the mapping) so their forms can link.`)) return;
  const meta = new Map();
  POLICY_FORM_MAP.sections.forEach(sec => sec.policy_form_mappings.forEach(m =>
    meta.set(String(m.policy_number), {title: m.policy_title, section: sectionForWorksheet(sec.worksheet)})));
  missing.forEach(num => {
    const m = meta.get(num) || {title: `Policy ${num}`, section: 'UNASSIGNED'};
    if (!SECTIONS.includes(m.section)) SECTIONS.push(m.section);
    POLICIES.push({
      section: m.section, policy: num, title: m.title, forms: POLICY_TO_FORMS.get(num) || [],
      departments: '', risk: 3, basis: 'Provisional — risk not yet classified',
      regulatory: 'To be confirmed', revision: '', provisional: true
    });
  });
  applyMappingToPolicies();
  byId('libraryNavCount').textContent = POLICIES.length;
  byId('tocNavCount').textContent = SECTIONS.length;
  renderDashboard();
  renderQuickTOC();
  renderTOC();
  renderPolicyTable();
  renderForms();
  renderMappingCoverage();
  toast(`${missing.length} provisional policy records added from the tracker mapping`);
}


/* ==================================================== user administration
   The directory of everyone with access. Security role governs what a
   person can do in the system; hospital role and department govern which
   policies they are assigned. Changing either keeps assignments in step.
   ======================================================================== */

const SECURITY_ROLES = [
  {name: 'System Administrator', level: 'Highest', admin: true,  can: 'Users, roles, integrations, and security settings'},
  {name: 'Policy Administrator', level: 'Elevated', admin: true, can: 'Create, edit, route, and publish policies and forms'},
  {name: 'Policy Owner',         level: 'Scoped',  admin: false, can: 'Draft and update the content they own'},
  {name: 'Approver',             level: 'Scoped',  admin: false, can: 'Approve controlled revisions before publication'},
  {name: 'Manager',              level: 'Manager', admin: false, can: 'See team completion and send reminders'},
  {name: 'Employee',             level: 'Standard',admin: false, can: 'Read, search, and acknowledge assigned content'},
  {name: 'Survey / Read-Only',   level: 'Read only', admin: false, can: 'Time-limited evidence access for surveyors'}
];
const isAdminRole = name => !!SECURITY_ROLES.find(r => r.name === name && r.admin);

/* Freedom signs in with Microsoft 365, so an account is only usable if its
   address lives in the tenant. Anything else is a directory record without
   a way in — worth showing rather than hiding. */
const TENANT_DOMAINS = ['freedomhc.com', 'freedombehavioral.com'];
const TENANT_DOMAIN = TENANT_DOMAINS[0];
const ENTRA_GROUPS = {
  'System Administrator': 'FPC-System-Admins',
  'Policy Administrator': 'FPC-Policy-Admins',
  'Policy Owner': 'FPC-Policy-Owners',
  'Approver': 'FPC-Approvers',
  'Manager': 'FPC-Managers',
  'Employee': '(authenticated, no group)',
  'Survey / Read-Only': 'FPC-Survey-ReadOnly'
};
const inTenant = email => TENANT_DOMAINS.some(d => String(email).toLowerCase().endsWith('@' + d));
const signInChip = e => inTenant(e.email)
  ? `<span class="pill" title="Signs in with Microsoft 365 as ${esc(e.email)}">Microsoft 365</span>${e.shared ? '<div class="subtle">shared mailbox</div>' : ''}`
  : `<span class="status pending" title="Not in the Freedom tenant — this account cannot sign in">No M365 account</span>`;
const securityRoleOf = e => e.securityRole || 'Employee';
let editingUserId = null;

function renderSignedInUser() {
  const me = currentUser();
  if (!me) return;
  byId('meInitials').textContent = (me.first[0] || '') + (me.last[0] || '');
  byId('meName').textContent = `${me.first} ${me.last}`;
  byId('meRole').textContent = securityRoleOf(me);
}

function renderSecurityRoles() {
  byId('roleGrid').innerHTML = SECURITY_ROLES.map(r => {
    const held = EMPLOYEES.filter(e => securityRoleOf(e) === r.name).length;
    const cls = r.level === 'Highest' ? 'overdue' : r.admin || r.level === 'Scoped' ? 'pending' : 'good';
    return `<div class="rolecard"><span class="status ${cls} lvl">${esc(r.level)}</span><b>${esc(r.name)}</b><p>${esc(r.can)}</p><p class="vhhash">Entra group: ${esc(ENTRA_GROUPS[r.name] || '—')}</p><p><b>${held}</b> ${held === 1 ? 'person' : 'people'}</p></div>`;
  }).join('');
}

function userAssignmentCount(id) {
  return ASSIGNMENTS.filter(a => a.userId === id).length;
}

function renderSignInBox() {
  const host = byId('userSignInBox');
  if (!host) return;
  const email = (byId('userEmail').value || '').trim();
  const role = byId('userSecurityRole').value;
  const group = ENTRA_GROUPS[role] || '';
  host.innerHTML = !email
    ? `<div class="rulebox" style="margin:0">Sign-in is Microsoft 365 — enter a ${TENANT_DOMAINS.map(d => '<b>@' + d + '</b>').join(' or ')} address to link this account to the tenant.</div>`
    : inTenant(email)
      ? `<div class="rulebox" style="margin:0"><b>Microsoft 365 sign-in</b> · UPN <b>${esc(email)}</b> · Entra group <b>${esc(group)}</b>. The Entra object id is captured on first sign-in and becomes the permanent link.</div>`
      : `<div class="rulebox" style="margin:0;border-color:#f3d38a;background:#fff9e8;color:#725400"><b>${esc(email)}</b> is outside the Freedom tenant (${TENANT_DOMAINS.join(', ')}), so this person cannot sign in. Keep it as a directory record, or use a Microsoft 365 address — external reviewers should get an Entra guest account in <b>FPC-Survey-ReadOnly</b>.</div>`;
}

function renderUserPreview() {
  renderSignInBox();
  const host = byId('userPreview');
  if (!host) return;
  const roles = selectedValues('userRoles'), depts = selectedValues('userDepartments');
  const draft = {status: 'Active', facility: byId('userFacility').value, roles, departments: depts};
  const hits = RULES.filter(r => r.active && matchEmployees(r).length &&
    (!r.facilities.length || r.facilities.includes(draft.facility)) &&
    (!r.departments.length || overlaps(r.departments, depts)) &&
    (!r.roles.length || overlaps(r.roles, roles)));
  const policies = new Set();
  hits.forEach(r => rulePolicyIndexes(r).forEach(i => policies.add(i)));
  host.innerHTML = `<div class="grouplabel">What this person will be assigned</div>
<div class="linkmatrix"><div><b>${hits.length}</b><span class="subtle">Rules matched</span></div><div><b>${policies.size}</b><span class="subtle">Policies</span></div><div><b>${roles.length + depts.length}</b><span class="subtle">Role/dept tags</span></div></div>
<div class="subtle" style="margin-top:7px">${hits.length ? 'Assignments are created on save and stay in step when the role or department changes.' : 'No assignment rule targets this audience yet — the user will have system access but no required reading.'}</div>`;
}

function saveUser() {
  const id = (byId('userId').value || '').trim();
  const first = (byId('userFirst').value || '').trim();
  const last = (byId('userLast').value || '').trim();
  const email = (byId('userEmail').value || '').trim();
  if (!id || !first || !last || !email) { toast('Employee ID, first name, last name, and email are required'); return; }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { toast('That email address does not look valid'); return; }
  if (EMPLOYEES.some(e => e.id === id && e.id !== editingUserId)) { toast(`Employee ID ${id} is already in use`); return; }
  if (EMPLOYEES.some(e => e.email.toLowerCase() === email.toLowerCase() && e.id !== editingUserId)) { toast(`${email} already has an account`); return; }
  const rec = {
    id, first, last, email,
    facility: byId('userFacility').value,
    roles: selectedValues('userRoles'),
    departments: selectedValues('userDepartments'),
    securityRole: byId('userSecurityRole').value,
    status: byId('userStatus').value
  };
  const existing = EMPLOYEES.find(e => e.id === editingUserId);
  if (existing) { Object.assign(existing, rec); toast(`${first} ${last} updated`); }
  else { EMPLOYEES.push(rec); toast(`${first} ${last} added as ${rec.securityRole}`); }
  syncAssignmentsToRoster();
  clearUserEditor();
  refreshUserViews();
}

/* Roster changes re-run the rules: new or re-activated people pick up what
   they are owed, and people who leave stop owing anything outstanding. */
function syncAssignmentsToRoster() {
  RULES.filter(r => r.active).forEach(materialize);
  const inactive = new Set(EMPLOYEES.filter(e => e.status !== 'Active').map(e => e.id));
  const known = new Set(EMPLOYEES.map(e => e.id));
  for (let i = ASSIGNMENTS.length - 1; i >= 0; i--) {
    const a = ASSIGNMENTS[i];
    if ((inactive.has(a.userId) || !known.has(a.userId)) && a.status === 'open') ASSIGNMENTS.splice(i, 1);
  }
}

function refreshUserViews() {
  renderUsers();
  renderSecurityRoles();
  renderAssignments();
  renderSignedInUser();
}

function clearUserEditor() {
  editingUserId = null;
  byId('userEditorTitle').textContent = 'Add User';
  ['userId','userFirst','userLast','userEmail'].forEach(id => byId(id).value = '');
  byId('userStatus').value = 'Active';
  byId('userSecurityRole').value = 'Employee';
  byId('userFacility').value = FORM_FACILITIES[0];
  ['userRoles','userDepartments'].forEach(id => selectAllMulti(id, false));
  renderUserPreview();
}

function editUser(id) {
  const e = EMPLOYEES.find(x => x.id === id);
  if (!e) return;
  editingUserId = id;
  byId('userEditorTitle').textContent = `Editing ${e.first} ${e.last}`;
  byId('userId').value = e.id;
  byId('userFirst').value = e.first;
  byId('userLast').value = e.last;
  byId('userEmail').value = e.email;
  byId('userStatus').value = e.status;
  byId('userSecurityRole').value = securityRoleOf(e);
  byId('userFacility').value = e.facility;
  setMultiSelection('userRoles', e.roles);
  setMultiSelection('userDepartments', e.departments);
  renderUserPreview();
  window.scrollTo({top: 0, behavior: 'smooth'});
  toast(`${e.first} ${e.last} loaded for editing`);
}

function toggleUser(id) {
  const e = EMPLOYEES.find(x => x.id === id);
  if (!e) return;
  if (e.id === CURRENT_USER_ID) { toast('You cannot deactivate the account you are signed in as'); return; }
  if (e.status === 'Active' && isAdminRole(securityRoleOf(e)) && activeAdmins().length <= 1) {
    toast('At least one active administrator must remain'); return;
  }
  e.status = e.status === 'Active' ? 'Inactive' : 'Active';
  syncAssignmentsToRoster();
  refreshUserViews();
  toast(`${e.first} ${e.last} marked ${e.status}`);
}

const activeAdmins = () => EMPLOYEES.filter(e => e.status === 'Active' && isAdminRole(securityRoleOf(e)));

function deleteUser(id) {
  const e = EMPLOYEES.find(x => x.id === id);
  if (!e) return;
  if (e.id === CURRENT_USER_ID) { toast('You cannot delete the account you are signed in as'); return; }
  if (isAdminRole(securityRoleOf(e)) && activeAdmins().length <= 1) { toast('At least one active administrator must remain'); return; }
  const acks = ASSIGNMENTS.filter(a => a.userId === id && a.status === 'acknowledged').length;
  if (!confirm(`Remove ${e.first} ${e.last}? Outstanding assignments are withdrawn.${acks ? ` ${acks} acknowledgement${acks === 1 ? '' : 's'} stay in the audit trail.` : ''}`)) return;
  EMPLOYEES.splice(EMPLOYEES.indexOf(e), 1);
  syncAssignmentsToRoster();
  if (editingUserId === id) clearUserEditor();
  refreshUserViews();
  toast(`${e.first} ${e.last} removed`);
}

function renderUsers() {
  const host = byId('userRows');
  if (!host) return;
  const q = (byId('userSearch')?.value || '').toLowerCase();
  const roleFilter = byId('userRoleFilter')?.value || '';
  const statusFilter = byId('userStatusFilter')?.value || '';
  const rows = EMPLOYEES.filter(e =>
    (!statusFilter || e.status === statusFilter) &&
    (!roleFilter || securityRoleOf(e) === roleFilter) &&
    (!q || [e.first, e.last, e.email, e.id, e.facility, securityRoleOf(e), ...(e.roles || []), ...(e.departments || [])].join(' ').toLowerCase().includes(q)));
  const active = EMPLOYEES.filter(e => e.status === 'Active');
  byId('userCount').textContent = `${rows.length} user${rows.length === 1 ? '' : 's'}`;
  byId('userNavCount').textContent = EMPLOYEES.length;
  byId('kpiUsers').textContent = EMPLOYEES.length;
  byId('kpiUsersActive').textContent = active.length;
  byId('kpiAdmins').textContent = activeAdmins().length;
  // Enterprise / Corporate is not a facility — count only the hospitals
  byId('kpiUserFacilities').textContent = new Set(active.map(e => e.facility).filter(f => f !== 'Enterprise / Corporate')).size;
  byId('kpiFacilityTotal').textContent = FORM_FACILITIES.filter(f => f !== 'Enterprise / Corporate').length;
  byId('kpiUserAssignments').textContent = ASSIGNMENTS.length;
  host.innerHTML = rows.length ? rows.map(e => {
    const role = securityRoleOf(e);
    return `<tr><td><b>${esc(e.first)} ${esc(e.last)}</b>${e.id === CURRENT_USER_ID ? ' <span class="adminbadge">YOU</span>' : ''}<div class="subtle">${esc(e.id)} · ${esc(e.email)}</div></td>
<td>${signInChip(e)}</td>
<td>${isAdminRole(role) ? `<span class="adminbadge">${esc(role)}</span>` : `<span class="pill">${esc(role)}</span>`}<div class="subtle">${esc(ENTRA_GROUPS[role] || '')}</div></td>
<td>${(e.roles || []).slice(0, 2).map(r => `<span class="tag">${esc(r)}</span>`).join('') || '<span class="subtle">No hospital role</span>'}<div class="subtle">${esc((e.departments || []).join(', ') || 'No department')}</div></td>
<td>${esc(e.facility)}</td>
<td><b>${userAssignmentCount(e.id)}</b></td>
<td><span class="status ${e.status === 'Active' ? 'good' : 'pending'}">${esc(e.status)}</span></td>
<td><div style="display:flex;gap:5px;flex-wrap:wrap"><button class="btn outline" style="padding:5px 9px;font-size:11px" onclick="editUser('${esc(e.id)}')">Edit</button><button class="btn outline" style="padding:5px 9px;font-size:11px" onclick="toggleUser('${esc(e.id)}')">${e.status === 'Active' ? 'Deactivate' : 'Activate'}</button><button class="btn outline" style="padding:5px 9px;font-size:11px" onclick="deleteUser('${esc(e.id)}')">Remove</button></div></td></tr>`;
  }).join('') : '<tr><td colspan="7" class="subtle" style="text-align:center;padding:24px">No users match the current filters.</td></tr>';
}
