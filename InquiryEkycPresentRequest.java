package vn.com.hdbank.hdbs.models.gateway.inquiryekyc;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import vn.com.hdbank.hdbs.constants.Constants;
import vn.com.hdbank.hdbs.constants.EnumResultCode;
import vn.com.hdbank.hdbs.constants.GWConstants;
import vn.com.hdbank.hdbs.models.ErrorMessage;
import vn.com.hdbank.hdbs.models.RequestBean;

public class InquiryEkycPresentRequest extends RequestBean {

    private String ekyType;
    private String username;
    private String clientNo;
    private String accountNo;
    private String accountType;
    private String email;
    private String phoneNumber;
    private String fullName;
    private String birthDate;
    private String fullNameOcr;
    private String birthDateOcr;
    private String dateOfIssueOcr;
    private String placeOfIssueOcr;
    private String expireOfIssueOcr;
    private String idNumber;
    private String idNumberType;
    private String idNumberOld;
    private String dateOfIssue;
    private String placeOfIssue;
    private String expireOfIssue;
    private String gender;
    private String address;
    private String stateIdContact;
    private String stateNameContact;
    private String districtIdContact;
    private String districtNameContact;
    private String wardIdContact;
    private String wardNameContact;
    private String streetNameContact;
    private String stateIdCurrent;
    private String stateNameCurrent;
    private String districtIdCurrent;
    private String districtNameCurrent;
    private String wardIdCurrent;
    private String wardNameCurrent;
    private String streetNameCurrent;
    private String nationalityId;
    private String nationalityName;
    private String branchId;
    private String branchName;
    private String literacyName;
    private String literacyDesc;
    private String maritalStatus;
    private String maritalDesc;
    private String careerId;
    private String careerName;
    private String positionId;
    private String positionName;
    private String salaryIncome;
    private String biometricsRate;
    private String faceMatching;
    private String merchantId;
    private String terminalId;

    public String getEkyType() {
        return ekyType;
    }

    public void setEkyType(String ekyType) {
        this.ekyType = ekyType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getClientNo() {
        return clientNo;
    }

    public void setClientNo(String clientNo) {
        this.clientNo = clientNo;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getFullNameOcr() {
        return fullNameOcr;
    }

    public void setFullNameOcr(String fullNameOcr) {
        this.fullNameOcr = fullNameOcr;
    }

    public String getBirthDateOcr() {
        return birthDateOcr;
    }

    public void setBirthDateOcr(String birthDateOcr) {
        this.birthDateOcr = birthDateOcr;
    }

    public String getDateOfIssueOcr() {
        return dateOfIssueOcr;
    }

    public void setDateOfIssueOcr(String dateOfIssueOcr) {
        this.dateOfIssueOcr = dateOfIssueOcr;
    }

    public String getPlaceOfIssueOcr() {
        return placeOfIssueOcr;
    }

    public void setPlaceOfIssueOcr(String placeOfIssueOcr) {
        this.placeOfIssueOcr = placeOfIssueOcr;
    }

    public String getExpireOfIssueOcr() {
        return expireOfIssueOcr;
    }

    public void setExpireOfIssueOcr(String expireOfIssueOcr) {
        this.expireOfIssueOcr = expireOfIssueOcr;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getIdNumberType() {
        return idNumberType;
    }

    public void setIdNumberType(String idNumberType) {
        this.idNumberType = idNumberType;
    }

    public String getIdNumberOld() {
        return idNumberOld;
    }

    public void setIdNumberOld(String idNumberOld) {
        this.idNumberOld = idNumberOld;
    }

    public String getDateOfIssue() {
        return dateOfIssue;
    }

    public void setDateOfIssue(String dateOfIssue) {
        this.dateOfIssue = dateOfIssue;
    }

    public String getPlaceOfIssue() {
        return placeOfIssue;
    }

    public void setPlaceOfIssue(String placeOfIssue) {
        this.placeOfIssue = placeOfIssue;
    }

    public String getExpireOfIssue() {
        return expireOfIssue;
    }

    public void setExpireOfIssue(String expireOfIssue) {
        this.expireOfIssue = expireOfIssue;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStateIdContact() {
        return stateIdContact;
    }

    public void setStateIdContact(String stateIdContact) {
        this.stateIdContact = stateIdContact;
    }

    public String getStateNameContact() {
        return stateNameContact;
    }

    public void setStateNameContact(String stateNameContact) {
        this.stateNameContact = stateNameContact;
    }

    public String getDistrictIdContact() {
        return districtIdContact;
    }

    public void setDistrictIdContact(String districtIdContact) {
        this.districtIdContact = districtIdContact;
    }

    public String getDistrictNameContact() {
        return districtNameContact;
    }

    public void setDistrictNameContact(String districtNameContact) {
        this.districtNameContact = districtNameContact;
    }

    public String getWardIdContact() {
        return wardIdContact;
    }

    public void setWardIdContact(String wardIdContact) {
        this.wardIdContact = wardIdContact;
    }

    public String getWardNameContact() {
        return wardNameContact;
    }

    public void setWardNameContact(String wardNameContact) {
        this.wardNameContact = wardNameContact;
    }

    public String getStreetNameContact() {
        return streetNameContact;
    }

    public void setStreetNameContact(String streetNameContact) {
        this.streetNameContact = streetNameContact;
    }

    public String getStateIdCurrent() {
        return stateIdCurrent;
    }

    public void setStateIdCurrent(String stateIdCurrent) {
        this.stateIdCurrent = stateIdCurrent;
    }

    public String getStateNameCurrent() {
        return stateNameCurrent;
    }

    public void setStateNameCurrent(String stateNameCurrent) {
        this.stateNameCurrent = stateNameCurrent;
    }

    public String getDistrictIdCurrent() {
        return districtIdCurrent;
    }

    public void setDistrictIdCurrent(String districtIdCurrent) {
        this.districtIdCurrent = districtIdCurrent;
    }

    public String getDistrictNameCurrent() {
        return districtNameCurrent;
    }

    public void setDistrictNameCurrent(String districtNameCurrent) {
        this.districtNameCurrent = districtNameCurrent;
    }

    public String getWardIdCurrent() {
        return wardIdCurrent;
    }

    public void setWardIdCurrent(String wardIdCurrent) {
        this.wardIdCurrent = wardIdCurrent;
    }

    public String getWardNameCurrent() {
        return wardNameCurrent;
    }

    public void setWardNameCurrent(String wardNameCurrent) {
        this.wardNameCurrent = wardNameCurrent;
    }

    public String getStreetNameCurrent() {
        return streetNameCurrent;
    }

    public void setStreetNameCurrent(String streetNameCurrent) {
        this.streetNameCurrent = streetNameCurrent;
    }

    public String getNationalityId() {
        return nationalityId;
    }

    public void setNationalityId(String nationalityId) {
        this.nationalityId = nationalityId;
    }

    public String getNationalityName() {
        return nationalityName;
    }

    public void setNationalityName(String nationalityName) {
        this.nationalityName = nationalityName;
    }

    public String getBranchId() {
        return branchId;
    }

    public void setBranchId(String branchId) {
        this.branchId = branchId;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getLiteracyName() {
        return literacyName;
    }

    public void setLiteracyName(String literacyName) {
        this.literacyName = literacyName;
    }

    public String getLiteracyDesc() {
        return literacyDesc;
    }

    public void setLiteracyDesc(String literacyDesc) {
        this.literacyDesc = literacyDesc;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getMaritalDesc() {
        return maritalDesc;
    }

    public void setMaritalDesc(String maritalDesc) {
        this.maritalDesc = maritalDesc;
    }

    public String getCareerId() {
        return careerId;
    }

    public void setCareerId(String careerId) {
        this.careerId = careerId;
    }

    public String getCareerName() {
        return careerName;
    }

    public void setCareerName(String careerName) {
        this.careerName = careerName;
    }

    public String getPositionId() {
        return positionId;
    }

    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getSalaryIncome() {
        return salaryIncome;
    }

    public void setSalaryIncome(String salaryIncome) {
        this.salaryIncome = salaryIncome;
    }

    public String getBiometricsRate() {
        return biometricsRate;
    }

    public void setBiometricsRate(String biometricsRate) {
        this.biometricsRate = biometricsRate;
    }

    public String getFaceMatching() {
        return faceMatching;
    }

    public void setFaceMatching(String faceMatching) {
        this.faceMatching = faceMatching;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(String terminalId) {
        this.terminalId = terminalId;
    }

    @Override
    public ErrorMessage validateParams() {
        ErrorMessage errorMessage = super.validateParams();
        if(errorMessage != null){
            return errorMessage;
        }

        errorMessage = validate1();
        if(errorMessage != null){
            return errorMessage;
        }

        if(StringUtils.isBlank(this.username)){
            return new ErrorMessage(EnumResultCode.REQUIRED_USER_ID);
        }

        if(StringUtils.isBlank(this.clientNo)){
            return new ErrorMessage(EnumResultCode.REQUIRED_CLIENT_NO);
        }

        if(StringUtils.isBlank(this.ekyType)){
            return new ErrorMessage(EnumResultCode.REQUIRED_EKYC_TYPE);
        }

        if(!StringUtils.equalsAnyIgnoreCase(this.ekyType, Constants.NEW_CUSTOMER, Constants.CURRENT_CUSTOMER)){
            return new ErrorMessage(EnumResultCode.INVALID_EKYC_TYPE);
        }

        if(StringUtils.equalsIgnoreCase(this.ekyType, Constants.CURRENT_CUSTOMER)
            || StringUtils.isBlank(this.accountNo)) {
            return new ErrorMessage(EnumResultCode.REQUIRED_ACCOUNT_NO);
        }

        if(StringUtils.isBlank(this.email)){
            return new ErrorMessage(EnumResultCode.REQUIRED_EMAIL);
        }

        if(StringUtils.isBlank(this.phoneNumber)){
            return new ErrorMessage(EnumResultCode.REQUIRED_PHONE_NUMBER);
        }

        if(StringUtils.isBlank(this.fullName)){
            return new ErrorMessage(EnumResultCode.REQUIRED_FULL_NAME);
        }

        if(StringUtils.isBlank(this.birthDate)){
            return new ErrorMessage(EnumResultCode.REQUIRED_BIRTH_DAY);
        }

        if(StringUtils.isBlank(this.fullNameOcr)){
            return new ErrorMessage(EnumResultCode.REQUIRED_FULL_NAME_OCR);
        }

        if(StringUtils.isBlank(this.birthDateOcr)){
            return new ErrorMessage(EnumResultCode.REQUIRED_BIRTH_DAY_OCR);
        }

        String data = this.username + this.clientNo + this.transactionTime + this.partnerId + GWConstants.SECURITY_PROPERTIES.getChecksumKey();
        String checksumData = DigestUtils.md5Hex(data);
        if (!StringUtils.equalsIgnoreCase(checksumData, this.checksum)) {
            return new ErrorMessage(EnumResultCode.INVALID_CHECKSUM);
        }

        return null;
    }

    private ErrorMessage validate1 (){

        if(StringUtils.isBlank(this.idNumber)){
            return new ErrorMessage(EnumResultCode.REQUIRED_ID_NUMBER);
        }

        if(StringUtils.isBlank(this.idNumberType)){
            return new ErrorMessage(EnumResultCode.REQUIRED_ID_NUMBER_TYPE);
        }

        if(StringUtils.isBlank(this.dateOfIssue)){
            return new ErrorMessage(EnumResultCode.REQUIRED_DATE_OF_ISSUE);
        }

        if(StringUtils.isBlank(this.dateOfIssueOcr)){
            return new ErrorMessage(EnumResultCode.REQUIRED_DATE_OF_ISSUE_OCR);
        }

        if(StringUtils.isBlank(this.placeOfIssue)){
            return new ErrorMessage(EnumResultCode.REQUIRED_PLACE_OF_ISSUE);
        }

        if(StringUtils.isBlank(this.placeOfIssueOcr)){
            return new ErrorMessage(EnumResultCode.REQUIRED_PLACE_OF_ISSUE_OCR);
        }

        if(StringUtils.isBlank(this.expireOfIssue)){
            return new ErrorMessage(EnumResultCode.REQUIRED_EXPIRED_OF_ISSUE);
        }

        if(StringUtils.isBlank(this.expireOfIssueOcr)){
            return new ErrorMessage(EnumResultCode.REQUIRED_EXPIRED_OF_ISSUE_OCR);
        }

        if(StringUtils.isBlank(this.gender)){
            return new ErrorMessage(EnumResultCode.REQUIRED_GENDER);
        }

        if(StringUtils.isBlank(this.nationalityId) || StringUtils.isBlank(this.nationalityName)){
            return new ErrorMessage(EnumResultCode.REQUIRED_NATIONAL_DETAIL);
        }

        if(StringUtils.isBlank(this.branchId) || StringUtils.isBlank(this.branchName)){
            return new ErrorMessage(EnumResultCode.REQUIRED_BRANCH);
        }

        if (StringUtils.isBlank(this.maritalStatus)){
            return new ErrorMessage(EnumResultCode.REQUIRED_MARITAL_STATUS);
        }

        if (StringUtils.isBlank(this.faceMatching)){
            return new ErrorMessage(EnumResultCode.REQUIRED_FACE_MATCHING);
        }

        return validate2();
    }

    private ErrorMessage validate2(){

        if(StringUtils.isBlank(this.merchantId)){
            return new ErrorMessage(EnumResultCode.REQUIRED_MERCHANT_ID);
        }

        if(StringUtils.isBlank(this.terminalId)){
            return new ErrorMessage(EnumResultCode.REQUIRED_TERMINAL_ID);
        }

        if(StringUtils.isBlank(this.address) || StringUtils.isBlank(this.stateIdContact) || StringUtils.isBlank(this.stateNameContact)
                || StringUtils.isBlank(this.districtIdContact) || StringUtils.isBlank(this.districtNameContact)
                || StringUtils.isBlank(this.wardIdContact) || StringUtils.isBlank(this.wardNameContact)
                || StringUtils.isBlank(this.streetNameContact) ){
            return new ErrorMessage(EnumResultCode.REQUIRED_ADDRESS);
        }

        if(StringUtils.isBlank(this.stateIdCurrent) || StringUtils.isBlank(this.stateNameCurrent)
                || StringUtils.isBlank(this.districtIdCurrent) || StringUtils.isBlank(this.districtNameCurrent)
                || StringUtils.isBlank(this.wardIdCurrent) || StringUtils.isBlank(this.wardNameCurrent)
                || StringUtils.isBlank(this.streetNameCurrent) ){
            return new ErrorMessage(EnumResultCode.REQUIRED_CURRENT_ADDRESS);
        }

        return null;
    }
}
