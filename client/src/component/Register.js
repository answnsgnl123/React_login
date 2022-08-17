import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';



import axios from 'axios';



const theme = createTheme({
    palette: {
        primary: {
          main: grey[900],
        },
        secondary: {
          main: '#f44336',
        },
      },
});

const AD_URL = 'http://localhost:4000/register';

export default function SignUp() {

    const [pvalue_1 , setPvalue] = React.useState({
      password: '1',
      tow_password: '2'
    });  

    const navigate = useNavigate();

    const [alert_1 , setAlert] = React.useState("info");

    // const { password , tow_password} = pvalue_1;

    const [value_1, setCValue] = React.useState(new Date('2022-01-01'));

    const [ischeck, setIschech] = React.useState(false);

    const conutDate = React.useRef("0000-00-00");

    // const[userdata, setUserValue] = React.useState(null);

    // React.useEffect( ()=> {
    //    axios.get(AD_URL).then((res)=> {
    //     setUserValue(res.data);
    //   })
    // },[]);

    const Passwordhandle = (e) => {
      const { name , value } = e.target;
      setPvalue({
        ...pvalue_1,
        [name] : value
      })     
    }

    React.useEffect(()=> {
      if(pvalue_1.password === pvalue_1.tow_password){
        setAlert("success");
      }
      else {
        setAlert("error");
      }
    },[pvalue_1])

    const Checkboxhandle = (event) => {
        setIschech(event.target.checked);
        console.log(event.target.checked);
    }

    const CalhandleChange = (newValue) => {
        setCValue(newValue);
        
        const nowstr = JSON.stringify(newValue);
        const slicestr = nowstr.slice(1,11)
        const datedata = slicestr.split(',')

        conutDate.current = datedata;

    };



    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
      setValue(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        name : data.get('firstName') + data.get('lastName'),
        id: data.get('id'),
        emali : data.get('email'),
        password: data.get('password'),
        address : data.get('city') + data.get('city_gu') + data.get('city_dong'),
        gender : value,
        });

        const name = data.get('firstName') + data.get('lastName');
        const id = data.get('id');
        const email = data.get('email');
        const psword = data.get('password');
        const address = data.get('city') + data.get('city_gu') + data.get('city_dong');
        const gender = value;
        const date = conutDate.current[0];

        axios.post(AD_URL, {name,id,email,psword,address,gender,date}).then((res) => {
          console.log(res.data.Register)
          if(res.data.Register === true){
            navigate('/login',{replace: true});
            return alert('회원가입 성공했습니다!');
           
          } else if (res.data.Register === 'ER_DUP_ENTRY'){
            return alert('ID 중복되었습니다.');
          } else {
            return alert(`Reister ${res.data.Register}`);
          }
        })
        
       
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ width: 200, height: 200,  m: 1, mt: 2, bgcolor: 'purple[500]' }} variant="rounded">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="id"
                  name="id"
                  autoComplete="id"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={Passwordhandle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="tow_password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={Passwordhandle}
                />
                <Alert severity={alert_1}>
                  <AlertTitle>Info</AlertTitle>
                  {alert_1} 입력해주세요.
                </Alert>
              </Grid>
              <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    label="날짜"
                    inputFormat="MM/dd/yyyy"
                    value={value_1}
                    onChange={CalhandleChange}
                    renderInput={(params) => <TextField {...params} fullWidth/>}/>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4}>
              <TextField
                  required
                  fullWidth
                  id="city"
                  label="시"
                  name="city"
                  autoComplete="시"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
              <TextField
                  required
                  fullWidth
                  id="city_gu"
                  label="구"
                  name="city_gu"
                  autoComplete="구/읍"
                />

              </Grid>
              <Grid item xs={12} sm={4}>
              <TextField
                  required
                  fullWidth
                  id="city_dong"
                  label="동"
                  name="city_dong"
                  autoComplete="동"
                />
              </Grid>

              
              <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                    {/* <Box
>
                        <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                        </Typography>
                    </Box> */}
              <TextareaAutosize
                    maxRows={5}
                    aria-label="maximum height"
                    defaultValue="개인정보보호정책
                    공동구매플렛폼 이용을 위해 수집한 귀하의 정보를 관리함에 있어서 「개인정보보호법」에서 규정하고 있는 책임과 의무를 준수하고 제공자가 동의한 내용 외 다른 목적으로는 활용하지 않음을 알려드립니다.
                    
                    - 개인정보 수집이용 목적 : 회원가입 및 본인인증, 대국민 서비스 제공 등
                    
                    - 개인정보 수집이용 목적 : 회원가입 및 본인인증, 대국민 서비스 제공 등
                    
                    - 수집하려는 개인정보 항목
                    
                    * 정부혁신담당공직자 회원의 경우
                    - 필수 : 아이디(이메일), 비밀번호, 성명, 휴대전화번호, 생년월일, 소속기관
                    - 선택 : 성별, 활동명, 거주지역
                    
                    * 국민회원 일반가입의 경우
                    - 필수 : 아이디(이메일), 비밀번호, 성명, 휴대전화번호, 생년월일
                    - 선택 : 성별, 활동명, 거주지역, 직업
                    
                    * 국민회원 SNS계정 인증가입의 경우
                    - 필수 : 아이디, 성명
                    - 선택 : 성별(네이버인증가입시 필수), 생년월일, 성별, 휴대전화번호, 활동명, 거주지역, 직업
                    
                    - 개인정보 보유 및 이용기간 : 개인정보 및 초상권 수집, 이용목적이 달성된 후에는 지체 없이 파기합니다. 개인정보 보유 및 이용기간은 회원 탈퇴 시까지입니다.
                    
                    - 이용자는 e혁신에서 수집하는 개인정보 제공에 대한 동의를 거부할 권리가 있습니다. 다만, e혁신 이용에 필요한 필수 항목의 제공에 대한 동의를 거부하시면 위의 서비스가 제한될 수 있습니다."
                    style={{ width: 450 }}
                    />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" onChange={Checkboxhandle}/>}
                  label="개인정보 보호정책 동의합니다."
                />
              </Grid>
              
            </Grid>
           
            <Button
              type="submit"
              variant="contained"
              disabled = {!ischeck}
              sx={{ mt: 3, mb: 1, width: '49%'}}
            >
              Sign Up</Button>   
            <Button
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 1, width: '49%', marginLeft : '2%'}}
            >cancel</Button>   
           
            
          </Box>
        </Box>
    
      </Container>
    </ThemeProvider>
  );
}