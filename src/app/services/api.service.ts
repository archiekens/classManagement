import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  server = 'http://192.168.1.104:2022';

  constructor(private http: HttpClient) { }

  loginInstructor(credentials) {
    let body = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);
    return this.http.post(this.server + '/instructors/login',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  registerInstructor(user) {
    let body = new HttpParams()
      .set('first_name', user.firstName)
      .set('last_name', user.lastName)
      .set('position', user.position)
      .set('username', user.username)
      .set('password', user.password)
      .set('confirm_password', user.confirmPassword)
      .set('gender', user.gender)
      .set('birthday', user.birthday.substring(0,10))
      .set('contact_no', user.contactNo)
    return this.http.post(this.server + '/instructors/add',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  updateInstructor(user) {
    let body = new HttpParams()
      .set('first_name', user.firstName)
      .set('last_name', user.lastName)
      .set('position', user.position)
      .set('username', user.username)
      .set('password', user.password)
      .set('confirm_password', user.confirmPassword)
      .set('gender', user.gender)
      .set('birthday', user.birthday.substring(0,10))
      .set('contact_no', user.contactNo)
    return this.http.put(this.server + '/instructors/edit/' + user.id,
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  getCourses(userId) {
    return this.http.get(this.server + '/courses/show_list/' + userId,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  addCourse(course) {
    let body = new HttpParams()
      .set('instructor_id', course.instructorId)
      .set('name', course.name)
      .set('code', course.code)
      .set('schedule', course.schedule)
    return this.http.post(this.server + '/courses/add',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  editCourse(course) {
    let body = new HttpParams()
      .set('instructor_id', course.instructorId)
      .set('name', course.name)
      .set('code', course.code)
      .set('schedule', course.schedule)
    return this.http.put(this.server + '/courses/edit/' + course.id,
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  deleteCourse(courseId) {
    return this.http.delete(this.server + '/courses/delete/' + courseId,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  addStudent(student) {
    let body = new HttpParams()
      .set('name', student.name)
      .set('course_id', student.courseId)
    return this.http.post(this.server + '/students/add',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  editStudent(student) {
    let body = new HttpParams()
      .set('name', student.name)
    return this.http.put(this.server + '/students/edit/' + student.id,
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  deleteStudent(studentId) {
    return this.http.delete(this.server + '/students/delete/' + studentId,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  getAttendances(dateTaken, courseId) {    
    return this.http.get(this.server + '/attendances/show_list/',
      {
        headers: this.headers,
        params: new HttpParams()
          .set('date_taken', dateTaken)
          .set('course_id', courseId),
        responseType: 'json'
      }
    );
  }

  addAttendances(attendances) {
    let body = new HttpParams();
    let i = 0;

    for(var attendance of attendances) {
      let is_present = attendance.Attendance.is_present ? '1' : '0';
      body = body
        .append('attendance['+i+'][student_id]', attendance.Attendance.student_id)
        .append('attendance['+i+'][course_id]', attendance.Attendance.course_id)
        .append('attendance['+i+'][date_taken]', attendance.Attendance.date_taken)
        .append('attendance['+i+'][is_present]', is_present);
      i++;
    }


    return this.http.post(this.server + '/attendances/add',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  editAttendances(attendances) {
    let body = new HttpParams();
    let i = 0;

    for(var attendance of attendances) {
      let is_present = attendance.Attendance.is_present ? '1' : '0';
      body = body
        .append('attendance['+i+'][id]', attendance.Attendance.id)
        .append('attendance['+i+'][student_id]', attendance.Attendance.student_id)
        .append('attendance['+i+'][course_id]', attendance.Attendance.course_id)
        .append('attendance['+i+'][date_taken]', attendance.Attendance.date_taken)
        .append('attendance['+i+'][is_present]', is_present);
      i++;
    }

    return this.http.put(this.server + '/attendances/edit',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  getStudents(courseId) {
    return this.http.get(this.server + '/students/show_list/' + courseId,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  getCriteria(courseId) {
    return this.http.get(this.server + '/criteria/show_list?course_id=' + courseId,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  addCriteria(criterion) {
    let body = new HttpParams()
      .set('name', criterion.name)
      .set('percentage', criterion.percentage)
      .set('course_id', criterion.courseId)
    return this.http.post(this.server + '/criteria/add',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  editCriteria(criterion) {
    let body = new HttpParams()
      .set('id', criterion.id)
      .set('name', criterion.name)
      .set('percentage', criterion.percentage)
      .set('course_id', criterion.courseId)
    return this.http.put(this.server + '/criteria/edit/' + criterion.id,
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  deleteCriteria(criteriaId) {
    return this.http.delete(this.server + '/criteria/delete/' + criteriaId,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  getActivities(courseId) {
    return this.http.get(this.server + '/activities/show_list?course_id=' + courseId,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  addActivity(activity) {
    let body = new HttpParams()
      .set('name', activity.name)
      .set('criteria_id', activity.criteriaId)
      .set('course_id', activity.courseId)
    return this.http.post(this.server + '/activities/add',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  editActivity(activity) {
    let body = new HttpParams()
      .set('name', activity.name)
      .set('criteria_id', activity.criteriaId)
      .set('course_id', activity.courseId)
    return this.http.put(this.server + '/activities/edit/' + activity.id,
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  deleteActivity(activityId) {
    return this.http.delete(this.server + '/activities/delete/' + activityId,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  searchStudent(query) {
    return this.http.get(this.server + '/students/search/',
      {
        headers: this.headers,
        params: new HttpParams()
          .set('name', query.name)
          .set('instructor_id', query.userId),
        responseType: 'json'
      }
    );
  }

  getActivityResults(activityId) {
    return this.http.get(this.server + '/activity_results/show_list?activity_id=' + activityId,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  addActivityResults(activityResults) {
    let body = new HttpParams();
    let i = 0;

    for(var result of activityResults) {
      body = body
        .append('activity_result['+i+'][activity_id]', result.ActivityResult.activity_id)
        .append('activity_result['+i+'][student_id]', result.ActivityResult.student_id)
        .append('activity_result['+i+'][score]', result.ActivityResult.score)
      i++;
    }

    return this.http.post(this.server + '/activity_results/add',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  editActivityResults(activityResults) {
    let body = new HttpParams();
    let i = 0;

    for(var result of activityResults) {
      body = body
        .append('activity_result['+i+'][id]', result.ActivityResult.id)
        .append('activity_result['+i+'][activity_id]', result.ActivityResult.activity_id)
        .append('activity_result['+i+'][student_id]', result.ActivityResult.student_id)
        .append('activity_result['+i+'][score]', result.ActivityResult.score)
      i++;
    }

    return this.http.put(this.server + '/activity_results/edit',
      body,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

  getStudentFinalGrade(studentId) {    
    return this.http.get(this.server + '/students/final_grade/' + studentId,
      {
        headers: this.headers,
        responseType: 'json'
      }
    );
  }

}
