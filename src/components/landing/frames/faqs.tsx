import React, { useEffect } from "react";
import {  Button, Sheet, ToggleButtonGroup } from "@mui/joy";
import Accordion, { accordionClasses } from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import AccordionGroup from "@mui/joy/AccordionGroup";
import { motion, AnimatePresence } from "framer-motion";
const MotionButton = motion(Button);
const MotionDiv = motion.div;

interface Category {
  id: string;
  category: string;
}

interface FAQItem {
  id: string;
  category: string; // link to Category.category
  question: string;
  answer: string;
}

interface FAQsProps {
  categories?: Category[];
  faqs?: FAQItem[];
}

export default function FAQs({ categories, faqs }: FAQsProps) {
  const [index, setIndex] = React.useState<number | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );
  const [questions, setQuestions] = React.useState<FAQItem[]>([]);

  // Set first category as active
  useEffect(() => {
    if (categories && categories.length > 0) {
      setActiveCategory(categories[0].category); // match by category name
    }
  }, [categories]);

  // Update questions when activeCategory changes
  useEffect(() => {
    if (activeCategory && faqs) {
      const selectedFaqs = faqs.filter((f) =>
        f.category?.toLowerCase().includes(activeCategory.toLowerCase())
      );
      setQuestions(selectedFaqs);
      setIndex(null);
    }
  }, [activeCategory, faqs]);

if (!categories) {
  return null;
}
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Sheet
          // variant="outlined"
          sx={{
            borderRadius: "8px",
            display: "inline-flex",
            overflowX: { xs: "visible", sm: "auto" },
            p: 0,
            gap: 1,
            maxWidth: "100%",
            whiteSpace: { xs: "normal", sm: "nowrap" }, // allow wrap on xs
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <ToggleButtonGroup
            variant="plain"
            spacing={0.5}
            value={activeCategory}
            onChange={(event, newValue) => setActiveCategory(newValue)}
            aria-label="Category selection"
            className="bg-[#006BD1]/10"
            sx={{
              borderRadius: "4px",
              display: "inline-flex",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              gap: 0.5,
              p: 0.5,
              width: "100%",
            }}
          >
            {categories?.map((item, index) => (
              <MotionButton
                key={index}
                value={item.category}
                color="neutral"
                aria-pressed={
                  activeCategory?.toLowerCase() === item.category?.toLowerCase()
                }
                aria-label={item?.category || "Category"}
                sx={{
                  borderRadius: "4px",
                  minWidth: "auto", // ✅ no fixed width
                  whiteSpace: "nowrap",
                  position: "relative",
                  ":hover": { backgroundColor: "gray.100" },
                  zIndex: 1,
                  fontWeight:
                    activeCategory?.toLowerCase() ===
                    item.category?.toLowerCase()
                      ? "bold"
                      : "normal",
                  flex: "0 0 auto", // ✅ shrink to fit
                  padding: "4px 10px", // adjust spacing instead of flex
                }}
              >
                {activeCategory?.toLowerCase() ===
                  item.category?.toLowerCase() && (
                  <MotionDiv
                    layoutId="highlight"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 4,
                      backgroundColor: "white",
                      zIndex: -1,
                    }}
                  />
                )}
                <span
                  className={
                    activeCategory?.toLowerCase() ===
                    item.category?.toLowerCase()
                      ? "body-medium !font-semibold"
                      : ""
                  }
                  style={{
                    color:
                      activeCategory?.toLowerCase() ===
                      item.category?.toLowerCase()
                        ? "black"
                        : undefined,
                  }}
                >
                  {item?.category || "Unnamed"}
                </span>
              </MotionButton>
            ))}
          </ToggleButtonGroup>
        </Sheet>
      </motion.div>

      <AccordionGroup
        disableDivider
        sx={(theme) => ({
          maxWidth: 920,
          width: "100%",
          [`& .${accordionClasses.root}`]: {
            marginTop: "0.5rem",
            border: "2px solid",
            borderColor: "#cbd5e2",
            borderRadius: "md",
            transition:
              "border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
            '& button:not([aria-expanded="true"])': {
              transition: "padding-bottom 0.3s ease",
              paddingBottom: "0.625rem",
            },
            "& button:hover": {
              background: "transparent",
            },
          },
          [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
            // bgcolor: "background.level1",
            borderRadius: "md",
            border: "2px solid",
            borderColor: "#0083ff",
            transition:
              "border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
          },
          '& [aria-expanded="true"]': {
            boxShadow: `inset 0 0px 0 ${theme.vars.palette.divider}`,
          },
        })}
      >
        {questions.map((item, i) => (
          <Accordion
            key={i}
            expanded={index === i}
            onChange={(event, expanded) => setIndex(expanded ? i : null)}
            sx={{
              padding: "8px 15px 4px 15px",
            }}
          >
            <AccordionSummary indicator={item.icon} aria-label={item.question}>
              <div
                className=" heading-small font-semibold p-0 prose" // 'prose' from Tailwind Typography is great for this
                dangerouslySetInnerHTML={{
                  __html: item.question,
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <AnimatePresence initial={false}>
                {index === i && (
                  <motion.div
                    key="accordion-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div
                      className="body-medium font-normal p-0 prose neutral-blueGrayLight"
                      dangerouslySetInnerHTML={{
                        __html: item.answer,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionGroup>
    </>
  );
}
