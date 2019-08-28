function GetFormEle() {
    var formElement = {};

    /*企业组织基本信息*/
    formElement.qyzzxx = [
        { 'name': 'beloneGrid', 'title': '所属网格','width':'50%', 'required': true, 'type': 'combobox',data:[{text: 'demo1', value: 1},{text: 'demo2', value: 2},{text: 'demo3', value: 3}]}, 
        { 'name': 'companyName', 'title': '企业名称', 'width': '50%', 'required': true,'type': 'text'}, 
        { 'name': 'ownership', 'title': '企业性质', 'width': '50%', 'required': true, 'type': 'combobox',data:[{text: 'demo1', value: 1},{text: 'demo2', value: 2},{text: 'demo3', value: 3}]}, 
        { 'name': 'industry', 'title': '所属行业','width':'50%',  'required': true, 'type': 'combobox',data:[{text: 'demo1', value: 1},{text: 'demo2', value: 2},{text: 'demo3', value: 3}] }, 
        { 'name': 'representativeName', 'title': '法定代表姓名','width':'50%',  'required': true, 'type': 'text' }, 
        { 'name': 'representativeTypes', 'title': '法定代表证件类型','width':'50%', labelWidth:105,  'required': true, 'type': 'combobox',data:[{text: 'demo1', value: 1},{text: 'demo2', value: 2},{text: 'demo3', value: 3}] }, 
        { 'name': 'representativeNumber', 'title': '法定代表证件号码','width':'50%', labelWidth:105, 'required': true, 'type': 'text' }, 
        { 'name': 'mobile', 'title': '联系方式','width':'50%',  'required': true, 'type': 'text'}, 
        { 'name': 'securityName', 'title': '治保负责人姓名','width':'50%',  'required': false, 'type': 'text' }, 
        { 'name': 'securityMobile', 'title': '治保负责人联系方式','width':'50%', labelWidth:113, 'required': false, 'type': 'text' },
        { 'name': 'scale', 'title': '规模（人）','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':0},
        { 'name': 'area', 'title': '面积（㎡）','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':2},
        { 'name': 'faxNumber', 'title': '传真号码','width':'50%',  'required': false, 'type': 'text' },
        { 'name': 'companyTelephone', 'title': '公司电话','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'businessScope', 'title': '经营范围','width':'100%',  'required': true, 'type': 'textarea'}
    ];
    /*企业组织税务登记信息*/
    formElement.swdjxx = [
        { 'name': 'taxNumber', 'title': '税务登记号','width':'50%',  'required': false, 'type': 'text' }, 
        { 'name': 'registrationType', 'title': '登记注册类型','width':'50%',  'required': false, 'type': 'text' }, 
        { 'name': 'signDate', 'title': '登记日期','width':'50%', 'dateFmt':'yyyy-MM-dd', 'required': false, 'type': 'datepicker',"onpicked": 'pickedLinkDate1',"oncleared": 'clearedLinkDate1' }, 
        { 'name': 'signAddress','width':'100%', 'title': '登记地址', 'required': false, 'type': 'text' }
    ];
    /*企业组织工商注册信息*/
    formElement.gszcxx = [
        { 'name': 'registeredCapital', 'title': '注册资金(万元)','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':2 }, 
        { 'name': 'natureEconomy', 'title': '经济性质','width':'50%',  'required': false, 'type': 'text' }, 
        { 'name': 'operationMode', 'title': '经营方式','width':'50%', 'required': false, 'type': 'text' }, 
        { 'name': 'registrationDate','width':'50%', 'title': '注册日期','dateFmt':'yyyy-MM-dd', 'required': false, 'type': 'datepicker',"onpicked": 'pickedLinkDate1',"oncleared": 'clearedLinkDate1'}
    ];
    /*企业组织机构代码信息*/
    formElement.zzjgxx = [
        { 'name': 'organizationType', 'title': '机构类型','width':'50%',  'required': false, 'type': 'text' }, 
        { 'name': 'registrationNum', 'title': '登记证号','width':'50%',  'required': false, 'type': 'text' }, 
        { 'startName': 'validityBeginDate','endName':'validityEndDate', 'startValue':'','endValue':'',
            'title': '有效期','width':'50%', 'required': false, 'type': 'daterange','dateFmt':'yyyy-MM-dd' }, 
        { 'name': 'code','width':'50%', 'title': '代码', 'required': false, 'type': 'text' },
        { 'name': 'issuedUnit','width':'100%', 'title': '颁发单位', 'required': false, 'type': 'text' }    
    ];
    /*两新组织信息*/
    formElement.lxzzxx = [
        { 'name': 'isBuildOrganization', 'title': '是否具备建立党组织条件','width':'50%', labelWidth:140, 'required': false, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'}, 
        { 'name': 'isRegulationEnterprises', 'title': '是否为规上企业','width':'50%',  'required': false, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'}, 
        { 'name': 'isHiddenDangers', 'title': '是否存在隐患','width':'100%',  'required': false, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'}, 
        { 'name': 'isOrganization', 'title': '是否有党组织','width':'50%',  'required': false, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'},
        { 'name': 'partyMembership', 'title': '党员数量(人)','width':'50%',  'required': false, 'type': 'text' ,'number':true,'fraction':0},
        { 'name': 'isTradeUnion', 'title': '是否有工会','width':'50%',  'required': false, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'},
        { 'name': 'unionMembership', 'title': '工会会员数量(人)','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':0 },
        { 'name': 'isGroupOrganization', 'title': '是否有团组织','width':'50%',  'required': false, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'},
        { 'name': 'komsomoletsNumber', 'title': '共青团员数量(人)','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':0 },
        { 'name': 'isFederation', 'title': '是否有妇联','width':'50%',  'required':false, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'},
        { 'name': 'federationMember', 'title': '妇联成员数量(人)','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':0 },
        { 'name': 'introductionAndhonors', 'title': '简介及荣誉','width':'100%',  'required': false, 'type': 'textarea' }
    ];
    /*安全生产重点信息*/
    formElement.aqscxx = [
        { 'name': 'isDangerEnterprises', 'title': '是否为危化企业','width':'50%',  'required': false, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'}, 
        { 'name': 'securityAttention', 'title': '关注度','width':'50%',  'required': false, 'type': 'combobox' }, 
        { 'name': 'hiddenDanger', 'title': '安全隐患','width':'100%',  'required': false, 'type': 'textarea' }, 
        { 'name': 'securityRectification', 'title': '整改情况','width':'100%',  'required': false, 'type': 'textarea' }
    ];
    /*消防安全重点信息*/
    formElement.xfaqxx = [
        { 'name': 'attention', 'title': '关注度','width':'50%',  'required': false, 'type': 'combobox' }, 
        { 'name': 'fireHazard', 'title': '消防隐患','width':'100%',  'required': false, 'type': 'textarea' }, 
        { 'name': 'rectification', 'title': '整改情况','width':'100%',  'required': false, 'type': 'textarea' }
    ];
    /*两新组织信息-必填*/
    formElement.lxzzbt = [
        { 'name': 'isBuildOrganization', 'title': '是否具备建立党组织条件','width':'50%', labelWidth:140, 'required': true, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'}, 
        { 'name': 'isRegulationEnterprises', 'title': '是否为规上企业','width':'50%',  'required': true, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'}, 
        { 'name': 'isHiddenDangers', 'title': '是否存在隐患','width':'100%',  'required': true, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'}, 
        { 'name': 'isOrganization', 'title': '是否有党组织','width':'50%',  'required': true, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'},
        { 'name': 'partyMembership', 'title': '党员数量(人)','width':'50%',  'required': true, 'type': 'text' ,'number':true,'fraction':0},
        { 'name': 'isTradeUnion', 'title': '是否有工会','width':'50%',  'required': true, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'},
        { 'name': 'unionMembership', 'title': '工会会员数量(人)','width':'50%',  'required': true, 'type': 'text','number':true,'fraction':0 },
        { 'name': 'isGroupOrganization', 'title': '是否有团组织','width':'50%',  'required': true, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'},
        { 'name': 'komsomoletsNumber', 'title': '共青团员数量(人)','width':'50%',  'required': true, 'type': 'text','number':true,'fraction':0 },
        { 'name': 'isFederation', 'title': '是否有妇联','width':'50%',  'required': true, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'},
        { 'name': 'federationMember', 'title': '妇联成员数量(人)','width':'50%',  'required': true, 'type': 'text','number':true,'fraction':0 },
        { 'name': 'introductionAndhonors', 'title': '简介及荣誉','width':'100%',  'required': true, 'type': 'textarea' }
    ];
    /*安全生产重点信息-必填*/
    formElement.aqscbt = [
        { 'name': 'isDangerEnterprises', 'title': '是否为危化企业','width':'50%',  'required': true, 'type': 'radio' , 'textField':'mc', 'valueField':'dm'}, 
        { 'name': 'securityAttention', 'title': '关注度','width':'50%',  'required': true, 'type': 'combobox' }, 
        { 'name': 'hiddenDanger', 'title': '安全隐患','width':'100%',  'required': true, 'type': 'textarea' }, 
        { 'name': 'securityRectification', 'title': '整改情况','width':'100%',  'required': true, 'type': 'textarea' }
    ];
    /*消防安全重点信息-必填*/
    formElement.xfaqbt = [
        { 'name': 'attention', 'title': '关注度','width':'50%',  'required': true, 'type': 'combobox' }, 
        { 'name': 'fireHazard', 'title': '消防隐患','width':'100%',  'required': true, 'type': 'textarea' }, 
        { 'name': 'rectification', 'title': '整改情况','width':'100%',  'required': true, 'type': 'textarea' }
    ];
    /*机关组织基本信息*/
    formElement.jgzzxx = [
        { 'name': 'beloneGrid', 'title': '所属网格','width':'100%', 'required': true, 'type': 'combobox'}, 
        { 'name': 'organName', 'title': '机关名称','width':'50%',  'required': true, 'type': 'text' }, 
        { 'name': 'organNature', 'title': '机关性质','width':'50%',  'required': true, 'type': 'combobox' },
        { 'name': 'organAddress', 'title': '机关地址','width':'100%',  'required': true, 'searchLevel': '0', 'type': 'address' },
        { 'name': 'scale', 'title': '规模（人）','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':0},
        { 'name': 'area', 'title': '面积（㎡）','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':2},
        { 'name': 'faxNo', 'title': '传真号码','width':'50%',  'required': false, 'type': 'text' },
        { 'name': 'organPhone', 'title': '机关电话','width':'50%',  'required': false, 'type': 'text' }
    ];
    /*事业单位基本信息*/
    formElement.sydwxx = [
        { 'name': 'beloneGrid', 'title': '所属网格','width':'100%', 'required': true, 'type': 'combobox'}, 
        { 'name': 'companyName', 'title': '单位名称','width':'50%',  'required': true, 'type': 'text' }, 
        { 'name': 'certificateNo', 'title': '证书编号','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'purpose', 'title': '宗旨和服务范围','width':'100%',  'required': true, 'type': 'text' },
        { 'name': 'nature', 'title': '单位性质','width':'50%',  'required': true, 'type': 'combobox' },
        { 'name': 'companyAddress', 'title': '单位住所','width':'50%',  'required': true, 'searchLevel': '0', 'type': 'address' },
        { 'name': 'legalPerson', 'title': '法定代表','width':'50%',  'required': false, 'type': 'text' },
        { 'name': 'contactNo', 'title': '联系电话','width':'50%',  'required': false, 'type': 'text' },
        { 'name': 'fundsSource', 'title': '经费来源','width':'50%',  'required': true, 'type': 'text'},
        { 'name': 'initialFund', 'title': '开办资金（万元）','width':'50%', labelWidth:105,  'required': true, 'type': 'text','number':true,'fraction':2 },
        { 'name': 'scale', 'title': '规模（人）','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':0},
        { 'name': 'area', 'title': '面积（㎡）','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':2},
        { 'startName': 'validStart','endName':'validEnd', 'startValue':'','endValue':'',
            'title': '有效期','width':'50%', 'required': true, 'type': 'daterange','dateFmt':'yyyy-MM-dd' },
        { 'name': 'faxNo', 'title': '传真号码','width':'50%',  'required': false, 'type': 'text' },
        { 'name': 'authoritiesIssued', 'title': '制发机关','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'registIssued', 'title': '登记机关','width':'50%',  'required': true, 'type': 'text'},
        { 'name': 'hostingEntity', 'title': '举办单位','width':'50%',  'required': true, 'type': 'text'}
    ];
    /*社会团体基本信息*/
    formElement.shttxx = [
        { 'name': 'beloneGrid', 'title': '所属网格','width':'100%', 'required': true, 'type': 'combobox'}, 
        { 'name': 'groupName', 'title': '团体名称','width':'50%',  'required': true, 'type': 'text' }, 
        { 'name': 'certificateNo', 'title': '证书编号','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'businessScope', 'title': '业务范围','width':'100%',  'required': true, 'type': 'text' },
        { 'name': 'groupNature', 'title': '团体性质','width':'50%',  'required': true, 'type': 'combobox' },
        { 'name': 'activityRegion', 'title': '活动地域','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'groupAddress', 'title': '团体住所','width':'50%',  'required': true, 'searchLevel': '0', 'type': 'address' },
        { 'name': 'contactInfo', 'title': '联系电话','width':'50%',  'required': true, 'type': 'text'},
        { 'name': 'legalPerson', 'title': '法定代表','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'legalPersonDocType', 'title': '法定代表证件类型','width':'50%', labelWidth:105, 'required': true, 'type': 'combobox' },
        { 'name': 'legalPersonCredNo', 'title': '法定代表证件号码','width':'50%', labelWidth:105, 'required': true, 'type': 'text' },
        { 'name': 'legalPersonDuty', 'title': '法定代表主要职责','width':'50%',  'required': false, 'type': 'text' },
        { 'name': 'sourceFunds', 'title': '资金来源','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'registeredCapital', 'title': '注册资金','width':'50%',  'required': true, 'type': 'text','number':true },
        { 'name': 'foreignBackground', 'title': '有无境外背景','width':'50%',  'required': false, 'type': 'combobox' },
        { 'name': 'scale', 'title': '规模（人）','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':0},
        { 'name': 'area', 'title': '面积（㎡）','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':2},
        { 'name': 'chargeSecResponse', 'title': '分管治保负责人姓名','width':'50%', labelWidth:115, 'required': false, 'type': 'text' },
        { 'name': 'chargeSecResContact', 'title': '分管治保负责人联系方式','width':'50%', labelWidth:140, 'required': false, 'type': 'text' },
        { 'name': 'securityResponse', 'title': '治安负责人姓名','width':'50%',  'required': false, 'type': 'text' },
        { 'name': 'securityResContact', 'title': '治安负责人联系方式','width':'50%', labelWidth:115, 'required': false, 'type': 'text' },
        { 'name': 'securityNo', 'title': '治保人数','width':'50%',  'required': true, 'type': 'text', 'number':true,'fraction':0}
    ];
    /*其他组织基本信息*/
    formElement.qtzzxx = [
        { 'name': 'beloneGrid', 'title': '所属网格','width':'100%', 'required': true, 'type': 'combobox'},
        { 'name': 'institutionName', 'title': '机构名称','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'certificateNo', 'title': '证书编号','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'seviceScope', 'title': '服务范围','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'activeArea', 'title': '活动地域','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'nature', 'title': '性质','width':'50%',  'required': true, 'type': 'combobox' },
        { 'name': 'address', 'title': '住所地址','width':'50%',  'required': true, 'searchLevel': '0', 'type': 'address' },
        { 'name': 'legalPerson', 'title': '法定代表','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'contactNo', 'title': '联系电话','width':'50%',  'required': true, 'type': 'text' },
        { 'name': 'legalPersonCardType', 'title': '法定代表证件类型','width':'50%', labelWidth:105,  'required': true, 'type': 'combobox'},
        { 'name': 'legalPersonCardNo', 'title': '法定代表证件号码','width':'50%', labelWidth:105, 'required': true, 'type': 'text' },
        { 'name': 'scale', 'title': '规模（人）','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':0},
        { 'name': 'area', 'title': '面积（㎡）','width':'50%',  'required': false, 'type': 'text','number':true,'fraction':2},
        { 'startName': 'validStart','endName':'validEnd', 'startValue':'','endValue':'',
            'title': '有效期','width':'50%', 'required': false, 'type': 'daterange','dateFmt':'yyyy-MM-dd' },
        { 'name': 'authoritiesIssued', 'title': '发证机关','width':'50%',  'required': true, 'type': 'text' }  
    ];
    return formElement;
}