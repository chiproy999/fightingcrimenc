import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Shield, UserPlus, LogIn, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        
        if (error) {
          if (error.message.includes('already registered')) {
            setError('This email is already registered. Please sign in instead.');
          } else {
            setError(error.message);
          }
        } else {
          setError('Check your email for the confirmation link!');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please try again.');
          } else {
            setError(error.message);
          }
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead 
        title={`${isSignUp ? 'Sign Up' : 'Sign In'} - Fighting Crime NC`}
        description={`${isSignUp ? 'Create an account' : 'Sign in'} to access crime alerts, submit anonymous tips, and stay updated on North Carolina crime news.`}
        keywords="NC crime login, fighting crime account, crime tips login, North Carolina public safety"
        canonicalUrl="/auth"
      />
      
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-backdrop"></div>
        
        <Card className="w-full max-w-md bg-card/95 backdrop-blur-md border-police-blue/30 shadow-evidence relative z-10">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-police p-3 rounded-lg shadow-evidence">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {isSignUp ? 'Join Fighting Crime NC' : 'Sign In to Fighting Crime NC'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isSignUp 
                ? 'Create your account to submit tips and receive crime alerts'
                : 'Access your account to manage tips and alerts'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  id="auth-email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 border-police-blue/30 focus:border-police-blue"
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  id="auth-password"
                  name="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-background/50 border-police-blue/30 focus:border-police-blue"
                />
              </div>
              
              {error && (
                <Alert className={error.includes('Check your email') ? 'border-evidence-green/50' : 'border-emergency-red/50'}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className={error.includes('Check your email') ? 'text-evidence-green' : 'text-emergency-red'}>
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <Button
                type="submit"
                className="w-full bg-gradient-police text-white hover:shadow-evidence"
                disabled={loading}
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    {isSignUp ? <UserPlus className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-police-blue hover:text-police-blue/80 text-sm transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
            
            <div className="mt-6 pt-4 border-t border-police-blue/20">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="border-evidence-green/50 text-evidence-green">
                  <Shield className="mr-1 h-3 w-3" />
                  Anonymous Tips Protected
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Auth;