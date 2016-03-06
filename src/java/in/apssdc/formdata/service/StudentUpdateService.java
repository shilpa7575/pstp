package in.apssdc.formdata.service;

import in.apssdc.formdata.dao.StudentUpdateDAO;
import in.apssdc.formdata.model.StudentModel;

import org.springframework.beans.factory.annotation.Autowired;

import com.andromeda.commons.model.Response;

public class StudentUpdateService
{
	@Autowired
	private StudentUpdateDAO studentUpdateDAO;

	Response response = new Response();

	public Response getStudentDetails(String registrationId)
	{
		response.setSuccessful(false);
		StudentModel studentData = studentUpdateDAO.getStudentDetails(registrationId);
		if(studentData!=null) {
			response.setResponseObject(studentData);
			response.setSuccessful(true);
		}else{
			response.setSuccessful(true);
			response.setResponseObject(null);
		}
		return response;
	}

	public Response insertStudentDetails(StudentModel studentModel)
	{
		response.setSuccessful(false);
		studentUpdateDAO.insertStudentDetails(studentModel);
		response.setSuccessful(true);
		response.setResponseObject(studentModel);
		return response;
	}
	
	
	public Response updateStudentDetails(StudentModel studentModel)
	{
		response.setSuccessful(false);
		int status = studentUpdateDAO.updateStudentDetails(studentModel);
		System.out.println("update status in service   :   "+status);
		response.setSuccessful(true);
		response.setResponseObject(studentModel);
		return response;
	}
	
	public Response educationDetails(StudentModel studentModel)
	{
		System.out.println("inside service "+ studentModel.getSscInstitute()+""+studentModel.getRegistrationId());
		response.setSuccessful(false);
		int status = studentUpdateDAO.educationDetails(studentModel);
		//System.out.println("insert education status   :   "+status);
		response.setSuccessful(true);
		response.setResponseObject(studentModel);
		return response;
	}
	
	/*public Response updateEducationDetails(StudentModel studentModel)
	{
		System.out.println("inside service "+ studentModel.getSscInstitute()+""+studentModel.getRegistrationId());
		response.setSuccessful(false);
		int status = studentUpdateDAO.updateEducationDetails(studentModel);
		System.out.println("update education status   :   "+status);
		response.setSuccessful(true);
		response.setResponseObject(studentModel);
		return response;
	}*/

}
