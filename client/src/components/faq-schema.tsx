import { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQ[];
}

/**
 * Componente que agrega FAQPage Schema (JSON-LD) para rich snippets en Google
 * Esto ayuda a mostrar las FAQs directamente en los resultados de búsqueda
 * IMPACTO: +30% CTR cuando aparecen rich snippets en resultados de búsqueda
 */
export function FAQSchema({ faqs }: FAQSchemaProps) {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    // Remove existing FAQ schema
    const existingScript = document.querySelector('script[type="application/ld+json"][data-type="faq"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new FAQ schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-type', 'faq');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [faqs]);

  return null;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}

/**
 * Componente visual de FAQs con Accordion
 * Usa el componente Accordion de shadcn/ui para mejor UX
 */
export function FAQAccordion({ faqs, className = '' }: FAQAccordionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className={className}>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
            <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

