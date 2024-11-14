import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function User() {
  return (
    <>
      <Link href="/user/create" id="createUser">
        <Button>Cadastrar usuário</Button>
      </Link>
      <Link href="/user/edit" id="editUser">
        <Button>Editar usuário</Button>
      </Link>
    </>
  );
}
