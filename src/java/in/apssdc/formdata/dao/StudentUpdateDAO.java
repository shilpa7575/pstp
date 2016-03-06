package in.apssdc.formdata.dao;

import in.apssdc.formdata.model.StudentModel;
import in.apssdc.formdata.model.TrainingBatchModel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

public class StudentUpdateDAO
{
	private Integer trainingBatchId = 0;
	@Autowired
	private SqlSessionFactory sqlSessionFactory;

	public StudentModel getStudentDetails(String registrationId)
	{
		System.out.println(registrationId);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		StudentModel studentModel = sqlSession.selectOne("PSTP.getStudentDetails", registrationId);
		return studentModel;
	}

	/*
	 * public int batchCreation(StudentModel studentModel) { int batchId = 0; SqlSession sqlSession
	 * = sqlSessionFactory.openSession(); if ((studentModel.getCourseId() != null) &&
	 * (studentModel.getCourseId() != ' ')) {
	 * 
	 * if (dataModel.getCourseId() == 1 || dataModel.getCourseId() == 2 || dataModel.getCourseId()
	 * == 3) {
	 * 
	 * partnerId = 1; studentModel.setPartnerId(partnerId); studentModel.setCollegeId(60);
	 * sqlSession.insert("PSTP.training_batches", studentModel);
	 * System.out.println("Batch created successfully!!!!!!!"); batchId =
	 * sqlSession.selectOne("PSTP.batchId", studentModel);
	 * System.out.println("Created Batch ID   : " + batchId);
	 * 
	 * // }
	 * 
	 * } return batchId; }
	 */

	public void insertStudentDetails(StudentModel studentModel)
	{
		int personalDetailsStatus = 0;
		Map<String, Object> params = new HashMap<>();
		params.put("student", studentModel);
		System.out.println("batchId   :    " + studentModel.getNewBatchId());
		SqlSession sqlSession = sqlSessionFactory.openSession();
		System.out.println("regid:  " + studentModel.getRegistrationId() + "gradbranchId   :    "
				+ studentModel.getGraduationBranchId());
		if (!StringUtils.isEmpty(studentModel.getRegistrationId())
				&& !StringUtils.isEmpty(studentModel.getGraduationBranch()))
		{
			// System.out.println("-----DAO---->"+params);
			personalDetailsStatus = sqlSession.insert("PSTP.insertStudentDetails", params);
			// int educationDetailsStatus = sqlSession.update("PSTP.updateEducationalDetails",
			// params);
			System.out.println("INSERT STATUS    :     " + personalDetailsStatus);

		}
		else
		{
			System.out.println("INSERT STATUS    :     " + personalDetailsStatus);
		}

		sqlSession.close();

	}

	public int updateStudentDetails(StudentModel studentModel)
	{
		int personalDetailsStatus = 0;
		Map<String, Object> params = new HashMap<>();
		params.put("student", studentModel);

		SqlSession sqlSession = sqlSessionFactory.openSession();
		if (studentModel != null)
		{
			trainingBatchId = studentModel.getTrainingBatchId();

			System.out.println("TrainingBatchId   :    " + trainingBatchId);
			System.out.println("New ProgramId   :    " + studentModel.getProgramid());

			TrainingBatchModel batchDetails =
					sqlSession.selectOne("PSTP.getBatchDetails", trainingBatchId);

			if (studentModel.getProgramid() == batchDetails.getProgramId())
			{
				personalDetailsStatus = sqlSession.update("PSTP.updateStudentDetails", params);
				int educationDetailsStatus =
						sqlSession.update("PSTP.updateEducationalDetails", params);
				System.out.println("same programID  UPDATE STATUS    :     " + personalDetailsStatus);
				sqlSession.close();
				return personalDetailsStatus;
			}
			else
			{
				System.out.println("Registered programId   :   " + batchDetails.getProgramId()
						+ "\t collegeId  :   " + batchDetails.getCollegeId());
				Integer collegeId = batchDetails.getCollegeId();
				
				List<TrainingBatchModel> batchList =
						sqlSession.selectList("PSTP.getBatchList", collegeId);
				for (TrainingBatchModel trainingBatchModel : batchList)
				{
					if (trainingBatchModel.getProgramId() == studentModel.getProgramid())
					{
						System.out.println("matched BatchID   :    "+trainingBatchModel.getId());
						studentModel.setTrainingBatchId(trainingBatchModel.getId());
						System.out.println(studentModel.getTrainingBatchId());
						params.put("newstudent", studentModel);
						int batchIdStatus = sqlSession.update("PSTP.updateBatchId", params);
						if (batchIdStatus == 1)
						{
							System.out.println("batchId changed successfully");
						}
						else
						{
							System.out.println("batchId Not Changed.....Please Check!!!");
						}
					}
					else
					{
						System.out.println("Not Matched BatchID s  :    "+trainingBatchModel.getId());
						/* personalDetailsStatus = sqlSession.update("PSTP.updateStudentDetails",params);*/
						 
					}
				}
				/*personalDetailsStatus = sqlSession.update("PSTP.updateStudentDetails", params);
				int educationDetailsStatus =
						sqlSession.update("PSTP.updateEducationalDetails", params);
				System.out.println("UPDATE STATUS    :     " + personalDetailsStatus);*/
				sqlSession.close();
				return personalDetailsStatus;
			}

		}else{
			
		}

		return personalDetailsStatus;

	}

	public int educationDetails(StudentModel studentModel)
	{
		int status = 0;
		System.out.println("inside dao " + studentModel.getSscInstitute() + ""
				+ studentModel.getRegistrationId());
		Map<String, Object> params = new HashMap<>();
		params.put("student", studentModel);
		SqlSession sqlSession = sqlSessionFactory.openSession();

		int studentStatusInEducation =
				sqlSession.selectOne("PSTP.studentStatusInEducation", params);

		if (studentStatusInEducation == 1)
		{
			// if(studentModel.getExistedProgramId() == studentModel.getProgramid()) {
			int updateEducationDetailsStatus =
					sqlSession.update("PSTP.updateEducationalDetails", params);
			status = updateEducationDetailsStatus;
			System.out.println("Update Education STATUS    :     " + updateEducationDetailsStatus);
			// }else{
			/*
			 * int newProgramId = studentModel.getProgramid();
			 * System.out.println("New Program Id   :   "+ newProgramId); int programIdStatus =
			 * sqlSession.update("PSTP.updateProgramId", params); if(programIdStatus==1) {
			 * System.out.println("programId changed successfully"); }else{
			 * System.out.println("programId Not Changed.....Please Check"); }
			 * 
			 * }
			 */
		}
		else
		{
			int insertEducationDetailsStatus =
					sqlSession.insert("PSTP.insertEducationalDetails", params);
			status = insertEducationDetailsStatus;
			System.out.println("Insert Education STATUS    :     " + insertEducationDetailsStatus);
		}
		// int educationDetailsStatus = sqlSession.update("PSTP.updateEducationalDetails", params);
		sqlSession.close();
		return status;

	}

	/*
	 * public int updateEducationDetails(StudentModel studentModel) {
	 * System.out.println("inside dao "+
	 * studentModel.getSscInstitute()+""+studentModel.getRegistrationId()); Map<String, Object>
	 * params = new HashMap<>(); params.put("student", studentModel); SqlSession sqlSession =
	 * sqlSessionFactory.openSession(); int updateEducationDetailsStatus =
	 * sqlSession.insert("PSTP.updateEducationalDetails", params); //int educationDetailsStatus =
	 * sqlSession.update("PSTP.updateEducationalDetails", params);
	 * System.out.println("Update Education STATUS    :     "+ updateEducationDetailsStatus);
	 * sqlSession.close(); return updateEducationDetailsStatus;
	 * 
	 * }
	 */

}
