import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleAuth = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      let result;
      
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email,
          password,
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      const { data, error } = result;

      if (error) {
        toast({
          title: isSignUp ? "Sign Up Failed" : "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        if (isSignUp && !data.session) {
          toast({
            title: "Check your email",
            description: "Please check your email for a confirmation link.",
          });
        } else {
          toast({
            title: "Success",
            description: isSignUp ? "Account created successfully!" : "Logged in successfully!",
          });
          onLogin();
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">D.K Mobiles</CardTitle>
          <p className="text-muted-foreground">
            {isSignUp ? "Create Account" : "Inventory Management"}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            onClick={handleAuth} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading 
              ? (isSignUp ? "Creating Account..." : "Logging in...") 
              : (isSignUp ? "Sign Up" : "Login")
            }
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full"
            disabled={isLoading}
          >
            {isSignUp ? "Already have an account? Login" : "Need an account? Sign Up"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};