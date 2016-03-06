package in.apssdc.formdata.controller;

import in.apssdc.formdata.dao.StudentUpdateDAO;
import in.apssdc.formdata.model.StudentModel;
import in.apssdc.formdata.service.StudentUpdateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.andromeda.commons.model.Response;

@Controller
@RequestMapping("/student")
public class StudentUpdateController
{
	@Autowired
	private StudentUpdateService studentUpdateService;
	@Autowired
	private StudentUpdateDAO studentUpdateDAO;
	Response studentData = null;
	Response educationData = null;
	
	@ResponseBody
	@RequestMapping( value = "/getStudentDetails", method = {RequestMethod.POST,RequestMethod.GET})
	public Response getStudentDetails(@RequestBody String registrationId)
	{
		//String studentId = studentModel.getStudentId();
		Response studentData = studentUpdateService.getStudentDetails(registrationId);
		System.out.println(studentData.getResponseObject());
		
		return studentData;

	}
	
	@ResponseBody
	@RequestMapping(value = "insert", method = RequestMethod.POST)
	public Response insertStudentDetails(@RequestBody StudentModel studentModel)
	{
		System.out.println("-----Controller----->"+studentModel.getGraduationBranchId());
		//int newBatchId =studentUpdateDAO.batchCreation(studentModel);
		//if(newBatchId!=0) {
			studentModel.setNewBatchId(169);
			studentData = studentUpdateService.insertStudentDetails(studentModel);
			educationData = studentUpdateService.educationDetails(studentModel);
		//}else{
			
		//}
		
		return studentData;

	}
	
	@ResponseBody
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public Response updateStudentDetails(@RequestBody StudentModel studentModel)
	{
		System.out.println("-----Controller----->"+studentModel.getTrainingBatchId()+"programid"+studentModel.getProgramid());
		Response studentData = studentUpdateService.updateStudentDetails(studentModel);
		Response educationData = studentUpdateService.educationDetails(studentModel);
		return studentData;

	}
	
	
	

}
