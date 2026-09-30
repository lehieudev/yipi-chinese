const fs = require('fs');

let file = 'src/layouts/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update fetchUser logic to use sessionStorage
const newFetchUserLogic = `
    const fetchUser = async () => {
      const isDemo = localStorage.getItem('demo_auth') === 'true';
      const { data: { session } } = await supabase.auth.getSession();
      
      const hasSeenWelcome = sessionStorage.getItem('has_seen_welcome') === 'true';

      if (!session && !isDemo) {
        navigate('/');
        return;
      }
      
      if (isDemo && !session) {
        setProfile({ full_name: 'Khách (Bản Demo)' });
        if (!hasSeenWelcome) {
           setTempName('Khách');
           setShowNamePrompt(true);
        }
        return;
      }
      
      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (data) {
          setProfile(data);
          if (!hasSeenWelcome) {
            setTempName(data.full_name || session.user.user_metadata?.full_name || '');
            setShowNamePrompt(true);
          }
        } else {
          // If profile missing, try to create it, or at least show prompt
          const defaultName = session.user.user_metadata?.full_name || '';
          setProfile({ id: session.user.id, email: session.user.email, full_name: defaultName });
          if (!hasSeenWelcome) {
             setTempName(defaultName);
             setShowNamePrompt(true);
          }
        }
      }
    };
`;

content = content.replace(
  /const fetchUser = async \(\) => \{[\s\S]*?if \(session\) \{[\s\S]*?\} else \{[\s\S]*?\}[\s\S]*?\}[\s\S]*?\};/,
  newFetchUserLogic.trim()
);

// Update handleSaveOnboarding to set sessionStorage
content = content.replace(
  "setShowNamePrompt(false);",
  "sessionStorage.setItem('has_seen_welcome', 'true');\n        setShowNamePrompt(false);"
);
content = content.replace(
  "setShowNamePrompt(false);",
  "sessionStorage.setItem('has_seen_welcome', 'true');\n       setShowNamePrompt(false);"
);

fs.writeFileSync(file, content);
