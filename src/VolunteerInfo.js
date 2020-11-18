import React, { useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ReactMarkdown from "react-markdown/with-html";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazarusTag from "./img/LazarusRisingTag.jpg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function saveDoc(contents){
  var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
  "xmlns:w='urn:schemas-microsoft-com:office:word' "+
  "xmlns='http://www.w3.org/TR/REC-html40'>"+
  "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
var footer = "</body></html>";
var sourceHTML = header+contents+footer;

var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
var fileDownload = document.createElement("a");
document.body.appendChild(fileDownload);
fileDownload.href = source;
fileDownload.download = 'document.doc';
fileDownload.click();
document.body.removeChild(fileDownload);
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  Rectangle3: {
    width: "157px",
    height: "68px",
    borderRadius: "10px",
    border: "solid 2px #f1f1f1",
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto; sans-serif",
    fontSize: "21px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2,
    letterSpacing: "1.26px",
    textAlign: "center",
    color: "#000000",
    margin: "0px 15px 0px 15px",
  },
  AppBar: {
    backgroundColor: "#FFFFFF",
    justifyContent: "space-evenly",
  },
  WorkShopButton: {
    width: "280px",
    height: "37px",
    borderRadius: "10px",
    backgroundColor: "#f1f1f1",
    margin: "10px",
  },
}));

export default function VolunteerInfo() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const editorRef = useRef();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    panel: 0,
    content: ""
  });

  const getContent = (tab) => {
    const careerAssesment = `## **Career Assessment Workshop Guide**
* Introduce Yourself
* Describe the purpose of the workshop 
* Ask participant the following questions and take notes 
    * Is the participant an extrovert or introvert? 
    * What technical skills does a participant have?
    * What soft skills does the participant have? 
    * Does the participant prefer hands on or manual labor?
    * Does the participant prefer a fast paced or slow paced work environment?
    * Is the participant more task oriented or people orientated while at work? 
* Based on participants' answers discuss their past work experiences
    * What did they like 
    * What did they not like 
    * What types of roles have interested them in the past 
* Narrow down options for potential employment that fits their working styles 
* Finish up session and complete feedback survey 
---`;
    const resumeDevelopment = `
## **Resume Development Workshop Guide**
* Introduce Yourself
* Describe the purpose of the workshop
    * Summarize what will be accomplished during workshop
* Ask participant to describe briefly their background 
* Make sure relevant resume template is open 
* Write down all basic info for resume 
    * Name, Email, phone number etc. 
    * Education ( High School, College, Certifications)
* Write down all relevant work experience 
    * Employer Company Name and  Position
    * Timeframe of employment  and City/State 
    * 2-3 bullets describing work experience 
* Ask Participant if there is anything else they think needs to be included
* Finish up workshop 
* Format resume and submit to Salesforce 
* Complete feedback survey  
---
`;
    const interviewPrep = `
## **Interview Preparation Workshop Guide**
* Introduce Yourself
* Describe the purpose of the workshop
    * Summarize what will be accomplished during workshop
* Make sure all relevant documents are open in front of you
    * Participant resume 
    * STAR Story Interview Document 
    * Practice Interview Questions 
* Explain interview etiquette
    * How to dress
    * How to present self
        * Proper posture, speak clearly etc.
* What to bring to interview
* Explain what the STAR story method is to answer interview questions 
* Have participant answer three- five practice interview questions
    * Provide verbal feedback
    * Take note on what they can improve on in notepad 
* Answer any last questions/ provide some last points of advice 
* Finish up session and complete feedback survey 
---`;
    const mockInterview = ` 
## **Mock Interview Workshop Guide** 
* Introduce Yourself
* Describe the purpose of the workshop
    * Summarize what will be accomplished during workshop 
* Ask participant any of the following questions and note their performance for each answer 
    * __Basic Questions__: 
        * Tell me about yourself?
        * What are the biggest strengths you bring?
        * What is one area in which you struggle?
        * What is your motivation for applying with this company?
        * Where do you see yourself 5 years from now?
        * Why should this company hire you, as opposed to someone else?
    * __Competency-Based Questions__:
        * Give an example of a goal you reached and tell me how you achieved it.
        * Give an example of a goal you didn't meet and how you handled it.
        * Describe a stressful situation at work and how you handled it.
        * Tell me about how you worked effectively under pressure.
        * How do you handle a challenge?
        * Have you been in a situation where you didn't have enough work to do?
        * Have you ever made a mistake? How did you handle it?
        * Give an example of how you worked on the team.
        * Have you handled a difficult situation with a coworker? How?
    * __Difficult Questions__: 
        * Why did you leave your last job?
        * What have you been doing in the past 6 months?
        * Is there anything that I should be made aware of that hasn’t been asked?
        * You’ve indicated a criminal background on the form, would you like to explain?
* Provide feedback for participant for:
    * Where they did well 
    * Where they can improve on 
    * What else could be included 
    * Answer any last questions/ provide some last points of advice 
    * Finish up session and complete feedback survey
---
  `;
    switch (tab) {
      case 0:
        return (
          <div
            style={{
              display: "flex",
              flex: 1,
              height: "100%",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div>
              <h1>Select Workshop Type:</h1>
              <h4>
                We offer four different workshops
                <br />
                select one from the list below
              </h4>
            </div>
            <div>
              <Button
                onClick={() => {
                  setState({ panel: 1 });
                }}
                className={classes.WorkShopButton}
              >
                career Assessment
              </Button>
              <br />
              <Button
                onClick={() => {
                  setState({ panel: 2 });
                }}
                className={classes.WorkShopButton}
              >
                resume development
              </Button>
              <br />
              <Button
                onClick={() => {
                  setState({ panel: 3 });
                }}
                className={classes.WorkShopButton}
              >
                interview prep
              </Button>
              <br />
              <Button
                onClick={() => {
                  setState({ panel: 4 });
                }}
                className={classes.WorkShopButton}
              >
                mock interview
              </Button>
            </div>
            <img
              src={LazarusTag}
              style={{
                position: "absolute",
                bottom: 0,
                zIndex: 3,
                justifySelf: "center",
                alignSelf: "center"
              }}
              height="44px"
              width="380px"
              margin="auto"
              alt="Logo"
            />
          </div>
        );
      case 1:
        return (
          <div style={{ textAlign: "left", overflow: "scroll" }}>
            <ReactMarkdown source={careerAssesment} escapeHtml={false} />
            <Button
              onClick={() => {
                setState({ panel: 0 });
              }}
              className={classes.Rectangle3}
            >
              Back
            </Button>
          </div>
        );
      case 2:
        return (
          <div style={{ textAlign: "left", overflow: "scroll" }}>
            <ReactMarkdown source={resumeDevelopment} escapeHtml={false} />
            <Button
              onClick={() => {
                setState({ panel: 0 });
              }}
              className={classes.Rectangle3}
            >
              Back
            </Button>
          </div>
        );
      case 3:
        return (
          <div style={{ textAlign: "left", overflow: "scroll" }}>
            <ReactMarkdown source={interviewPrep} escapeHtml={false} />
            <Button
              onClick={() => {
                setState({ panel: 0 });
              }}
              className={classes.Rectangle3}
            >
              Back
            </Button>
          </div>
        );
      case 4:
        return (
          <div style={{ textAlign: "left", overflow: "scroll" }}>
            <ReactMarkdown source={mockInterview} escapeHtml={false} />
            <Button
              onClick={() => {
                setState({ panel: 0 });
              }}
              className={classes.Rectangle3}
            >
              Back
            </Button>
          </div>
        );
      default:
        return <div>Error</div>;
    }
  };

  const markdownList = `## **Lazarus Rising FAQs** 
  ---
  1. Workshop is experiencing technical issues, who should I reach out to?
      * For  technical assistance during a workshop, please reach out to Liz Gerner at (781)-974-8511 or reach out in our slack volunteer channel to get in touch immediately with a management team member to assist you. 
  2. Participant has not shown up to the workshop, what should I do now? 
      * If a participant has not shown up five minutes past the start of the session please contact your regional coordinator. They will work with shelter coordinators to find the participant. If after 15 minutes the participant has still not shown up, you may exit the session.
  3. Where can I find the resume templates?
      * The resume templates can be found in the volunteer community portal under the training documents section. Also a copy of the templates will be provided in the onboarding training packet given during your orientation. 
  4. My participant is not motivated, what should I do now? 
      * Everyone has their off days, participants are no different. If you are struggling to connect with your participant we find it's helpful to take a step back. Switching the topic of the conversation for a few minutes to a more lighter subject may be helpful in connecting with your participant. 
  5. Participants have a large gap of time between work, how should I advise my participant to explain this in interviews? 
      * They should  be truthful without going into unnecessary detail. A basic template for their answer could be: “I *reason you were not employed*. During that time, *what you did during the gap*. Returning to work was top of mind during that period and I'm ready to do that now. 
  6. Do I have to give my contact info to the participant? 
      * No, you may  give up as much information as you are comfortable with. Lazarus Rising does not reveal anything aside from your first name to anyone to protect your privacy. 
  7. It’s hard to hear my participant, how should I handle this? 
      * Ask your participant to speak directly into the microphone. If the issue still persists, feel free to reach out to the regional coordinator who will work with the shelter coordinator to handle any outside noise.
  8. My participant is going to need another session to finish up, how do I set this up?
    * Once the workshop has been completed, be sure to fill out the post workshop completion form. There will be a section on the form where you may fill out where your participant and you left off.
  ---
      `;

  const settings = {
    dots: false,
    arrows: false,
    swipe: false,
  };
  return (
    <div
      className={classes.root}
      style={{ height: "100%", overflow: "scroll" }}
    >
      <AppBar className={classes.AppBar} position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab className={classes.Rectangle3} label="Guides" {...a11yProps(0)} />
          <Tab
            className={classes.Rectangle3}
            label="Notepad"
            {...a11yProps(1)}
          />
          <Tab className={classes.Rectangle3} label="FAQ" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel style={{ height: "100%" }} value={value} index={0}>
        {getContent(state.panel)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{paddingTop:"10px",paddingBottom:"10px"}}><i>Please remember to copy text into another document before leaving the workshop portal.</i></div>
        <SunEditor
          height={500}
          setContents={state.content}
          ref={editorRef}
          setOptions={{
            buttonList: buttonList.basic 
          }
          }
          onChange={(content)=>{
            setState({...state, content:content})
          }
          }
        />
        <button onClick={()=>{saveDoc(state.content)}}>Export to Word</button>
      </TabPanel>
      <TabPanel value={value} style={{ textAlign: "left" }} index={2}>
        <ReactMarkdown source={markdownList} escapeHtml={false} />
      </TabPanel>
    </div>
  );
}
