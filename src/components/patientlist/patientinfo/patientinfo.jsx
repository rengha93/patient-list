import React, { useEffect } from 'react';
import classes from './patientinfo.module.css';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import Avatar from '@mui/material/Avatar';
import { deepPurple, amber, cyan, green, pink } from '@mui/material/colors';
import useFetch from '../../../customhooks/useFetch';
import CircularProgress from '@mui/material/CircularProgress';

const marks = [
    { value: 0 },
    { value: 20 },
    { value: 40 },
    { value: 60 },
    { value: 80 },
    { value: 100 },
];

const importedColors = [deepPurple, amber, cyan, green, pink];

const tableHeading = [ 'Name', 'Gender', 'Birth date', 'Address', 'Phone'];

const PatientInfo = () => {
    const [value, setValue] = useState([0, 100]);
    const [patientListData, setPatientListData] = useState([]);
    const [filteredPatientList, setFilteredPatientList] = useState([]); 
    const apiUrl = 'http://hapi.fhir.org/baseR4/Patient?_pretty=true&_format=json';
    const { data, loading, error } = useFetch(apiUrl);


    useEffect(() => {
        setPatientListData(data?.entry);
        const [min, max] = value;

        //set the filtered data on initial render with initial value
        const filterData = patientListData?.filter((list) => {
            const patientAge = calculateAge(list?.resource?.birthDate);
            return patientAge >= min && patientAge <= max;
        });
        
        setFilteredPatientList(filterData);

        console.log('api data', data?.entry);
    }, [data?.entry]);

    function filterAge(value) {
        return `${value}`;
    }

    const calculateAge = (dateofbirth) => {
        if(!dateofbirth) {
            return (<span>-</span>);
        }

        const dob = new Date(dateofbirth);
        const currentDate = new Date();

        const yearofDifference = currentDate.getFullYear() - dob.getFullYear();
        const monthsDiff = currentDate.getMonth() - dob.getMonth();
        const daysDiff = currentDate.getDate() - dob.getDate();

        if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
            return '-'
        } else {
            return yearofDifference;
        }
    }

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * importedColors.length);
        const colors = {
            bgcolor: importedColors[randomIndex][500],
            color: importedColors[randomIndex][900]
        };

        return colors;
    }

    const getAddress = (address) => {
        const flattenedData = address?.map((item) => ({
            use: item.use,
            line: item.line.join(", "),
            city: item.city
        }));

        const addresstext = flattenedData?.map(item => {
            return `${item.line}, ${item.city}`;
        });

        const formattedAddress = addresstext?.join('');
        if(formattedAddress?.toString()) {
            return formattedAddress?.toString();        
        } else {
            return '-';
        }
    }
    
    const onSliderRangeChange = (event) => {
        console.log('slider', event.target.value);
        setValue(event?.target?.value);
        const [min, max] = event?.target?.value;

        //iterate the date and filter the values within the slider range
        const filterData = patientListData?.filter((list) => {
            const patientAge = calculateAge(list?.resource?.birthDate);
            console.log('filterData', patientAge >= min && patientAge <= max);
            return patientAge >= min && patientAge <= max;
        });
        
        setFilteredPatientList(filterData);
    }
    
    const genereateAvatar = (avatarName) => {
        let avatartext = ''
        if(avatarName[0]?.given.length >= 1) {
            avatartext = avatarName[0]?.given[0];
            return avatartext.slice(0,1);
        } else if(avatarName[0]?.given.length > 1 ) {
            avatartext = avatarName[0]?.given[0] + avatarName[0]?.given[1];
            return avatartext;
        }
    };

    const getPhoneNumber = (telecom) => {
        const phoneno = telecom?.filter(no => no?.system === 'phone');
        if(phoneno) {
            return phoneno[0].value;
        } else {
            return '-';
        }
    }


    //showing the loader when loading
    if(loading) {
        return (
            <div style={{minHeight: '50px', margin: '12px 0'}}>
                <CircularProgress />
            </div>
        )
    };

    //rendering the below code when data is loaded
    if(data) {
        return (
            <div className={classes.patientinfoContainer}>
                <div className={classes.patientInfo}>
                    <div className={classes.filterContainer}>
                        <div style={{marginRight: '16px'}}>Filter by age</div>
                        <Slider
                        getAriaLabel={() => 'Filter Age'}
                        value={value}
                        onChange={onSliderRangeChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={filterAge}
                        defaultValue={20}
                        step={1}
                        marks={marks.map((mark) => ({
                            ...mark,
                            label: (
                                <span className="custom-mark"></span>
                            ),
                            }))}
                        />
                    </div>
                    
                    {/* table to show the patients list */}
                    <Table>
                        <TableHead className={classes.tablehead}>
                            <TableRow>
                            <TableCell>
                            </TableCell>
                            {tableHeading.map((heading, index) => (
                                <TableCell className={classes.tableheadtext} key={index}>
                                    {heading}
                                    <IconButton className={classes.sortingIcon}>
                                        <UnfoldMoreOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tablebody}>
                            {filteredPatientList && filteredPatientList?.map((row, index) => (
                            <TableRow key={row?.resource?.id + index}>
                                <TableCell>
                                    <Avatar sx={getRandomColor()}>{genereateAvatar(row?.resource?.name)}</Avatar>   
                                </TableCell>
                                <TableCell>{row?.resource?.name[0]?.family}</TableCell>
                                <TableCell>{row?.resource?.gender ? row?.resource?.gender : '-'  }</TableCell>
                                <TableCell>{calculateAge(row?.resource?.birthDate)}</TableCell>
                                <TableCell>{getAddress(row?.resource?.address)}</TableCell>
                                <TableCell>{getPhoneNumber(row?.resource?.telecom)}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
        
                </div>
            </div>
          )
    }

    //showing error message when api is unavailable
    if(error){
        return (
            <>
                <h2>Error Occured while fetching the api</h2>
            </>
        )
    }
}

export default PatientInfo