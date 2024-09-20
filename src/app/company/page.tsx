import Link from "next/link"
import { Button } from '@/components/ui/button'

export default function Company() {
    return (
        <div>
            <Link href="/company/create" id="createCompany">
                <Button>
                    Cadastrar empresa
                </Button>
            </Link>
        </div>
    )
}