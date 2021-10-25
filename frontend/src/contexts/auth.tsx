// Configurar uma API de contexto
// Configurar para que todos os componentes tenham acesso a informação
// se o usuário está logdo ou não
// Coloco ele por volta de toda a aplicação

import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
};

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  // Configurando autorização com login do Github:
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=37263dabde84ab06c0e8`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });

    const { token, user } = response.data;

    // Salvar o token no cache, por mais que o usuário feche o navegador ele permanece armazenado:
    localStorage.setItem("@dowhile:token", token);

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  }

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      // Obter o token da requisição:
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("profile").then((response) => {
        console.log(response.data);
      });
    }
  }, []);

  // Obter as informações do usuário através do código que o Github retorna
  // Verificar se a URL possuí o código do GitHub:
  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    // Tratamento para que não exiba o código na URL:
    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
