// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
interface CourseDescriptionPart extends CoursePartBase{
    description: string;
}
  interface CourseNormalPart extends CourseDescriptionPart {
    type: "normal";
    
  }
  
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
  
  interface CourseSubmissionPart extends CourseDescriptionPart {
    type: "submission";
    exerciseSubmissionLink: string;
  }
  interface CourseSpecialnPart extends CourseDescriptionPart {
    type: "special";
    requirements: string[];
  }
  
  export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialnPart;