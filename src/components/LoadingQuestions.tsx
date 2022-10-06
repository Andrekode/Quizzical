import { Box, CircularProgress } from '@mui/material';
export default function LoadingQuestions() {
    return (
        <Box
            component='div'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{ mb: 5 }}>
                <h1>Loading questions...</h1>
            </Box>
            <Box>
                <CircularProgress />
            </Box>
        </Box>
    );
}
