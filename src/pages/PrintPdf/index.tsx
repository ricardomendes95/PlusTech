import React, { useEffect, useRef, useState } from 'react'
import { AiOutlinePrinter } from 'react-icons/ai'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useHistory, useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { Menu } from '../../components'
import { ComponentToPrint } from '../../components/Pdf'
import { Definitions } from '../../core/types'
import { routes } from '../../routes'
import { PaymentService } from '../../services'

import * as S from './style'
interface PrintParams {
  id: string
}
export default function PrintPdf() {
  const componentRef = useRef<ComponentToPrint | null>(null)
  const history = useHistory()
  const params = useParams<PrintParams>()

  const [item, setItem] = useState<Definitions['Payment']>()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current || null,
  })

  async function loadContributor() {
    try {
      const { data } = await PaymentService.findOne(Number(params?.id))
      setItem(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadContributor()
  }, [params.id])

  return (
    <Menu>
      <div>
        <S.Action>
          <a onClick={() => history.push(routes.payment)}>
            <IoMdArrowRoundBack size={30} />
          </a>
          <S.Print type="primary" onClick={handlePrint}>
            Imprimir
            <AiOutlinePrinter size={20} />
          </S.Print>
        </S.Action>
        <S.Content>
          {item ? (
            <ComponentToPrint ref={componentRef} item={item} />
          ) : (
            <p>aguardando</p>
          )}
        </S.Content>
      </div>
    </Menu>
  )
}
