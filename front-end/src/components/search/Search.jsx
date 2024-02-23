import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <Paper className="searchbutton"
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200, borderRadius: "20px", backgroundColor: '#f1f1f1'}}
      elevation={0}
    >
        <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search here..."
        />
    </Paper>
  );
};

export default Search;
