/* 
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqbpzbxsbttwzfnwqbsh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxYnB6YnhzYnR0d3pmbndxYnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NTU0NjQsImV4cCI6MjA0ODQzMTQ2NH0.KeRO9HHzZF0tb8i4u1rFk6MtAYwn_RPFwEqQq0G4mfs'
const supabase = createClient(supabaseUrl, supabaseKey)

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [uploading, upsetLoading] = useState(false);

    const handlefileChange = (e) => {
        console.log(e.target.files);
        const selectedFile = e.target.files;
        setFile(selectedFile);
        setError(null);
     }

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }
        try {
            setUploading(true);
            setError(null);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            const { error: uploadError } = await supabase.storage.
                from('hotel')
                .upload(filePath, , file, {
                    cacheControl: '3600',
                    upsert: false,
                });
            
            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage.
                from('hotel').getPublicUrl(filePath);
            
            console.log('File uploaded successfully:', publicUrl);
            setFile(null);

            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';

        } catch(err) {
            console.error('Error uploading:', err);
            setError(err.message || 'Error uploading file');
        } finally {
            setUploading(false);
        }
    }
    return (
        
    )
}
export default ImageUploader; */