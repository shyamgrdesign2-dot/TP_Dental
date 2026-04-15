"use client"

import { useEffect, useId, useMemo, useState } from "react"
import clsx from "clsx"
import { ArrowDown2, ArrowUp2, InfoCircle } from "iconsax-reactjs"
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer"
import { DrawerHeader } from "@/components/dental/plan/plan-shared"
import { TPButton as Button } from "@/components/tp-ui/button-system"
import type { BillingItem } from "@/lib/billing-catalog"
import { computeBillingLineTotal, formatBillingInr } from "@/lib/billing-catalog"
import { useBillingCatalog } from "@/lib/billing-catalog-context"
import styles from "@/app/billing-settings/billing-settings.module.scss"

function sanitizeDecimal(raw: string) {
  const cleaned = raw.replace(/[^\d.]/g, "")
  const firstDot = cleaned.indexOf(".")
  if (firstDot === -1) return cleaned
  return cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "")
}

type AddDentalBillItemDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialName?: string
  onSaved?: (item: BillingItem) => void
}

export function AddDentalBillItemDrawer({
  open,
  onOpenChange,
  initialName = "",
  onSaved,
}: AddDentalBillItemDrawerProps) {
  const formId = useId()
  const { addItem } = useBillingCatalog()
  const [formName, setFormName] = useState("")
  const [formPrice, setFormPrice] = useState("")
  const [formGst, setFormGst] = useState("")
  const [formDiscount, setFormDiscount] = useState("")
  const [formDiscountUnit, setFormDiscountUnit] = useState<"inr" | "percent">("inr")
  const [formErrors, setFormErrors] = useState({ name: "", price: "" })

  useEffect(() => {
    if (open) {
      setFormName(initialName.trim())
      setFormPrice("")
      setFormGst("")
      setFormDiscount("")
      setFormDiscountUnit("inr")
      setFormErrors({ name: "", price: "" })
    }
  }, [open, initialName])

  const drawerPreviewTotal = useMemo(() => {
    const priceNum = Number(sanitizeDecimal(String(formPrice)))
    if (!Number.isFinite(priceNum) || priceNum <= 0) return null
    const gstPct = formGst.trim() === "" ? 0 : Number(sanitizeDecimal(String(formGst))) || 0
    const discountRaw = sanitizeDecimal(String(formDiscount))
    const discount = discountRaw === "" ? 0 : Number(discountRaw)
    if (!Number.isFinite(discount) || discount < 0) return null
    return computeBillingLineTotal(priceNum, discount, gstPct, formDiscountUnit)
  }, [formPrice, formGst, formDiscount, formDiscountUnit])

  function handleSave() {
    const name = formName.trim()
    const priceNum = Number(sanitizeDecimal(String(formPrice)))
    const nextErrors = { name: "", price: "" }
    if (!name) nextErrors.name = "Enter a name to continue."
    if (!Number.isFinite(priceNum) || priceNum <= 0) nextErrors.price = "Enter a valid price greater than zero."
    if (nextErrors.name || nextErrors.price) {
      setFormErrors(nextErrors)
      return
    }

    const gstPct = formGst.trim() === "" ? 0 : Number(sanitizeDecimal(String(formGst))) || 0
    const discountRaw = sanitizeDecimal(String(formDiscount))
    const discount = discountRaw === "" ? 0 : Number(discountRaw)
    if (!Number.isFinite(discount) || discount < 0) return

    const item: BillingItem = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `dent-${Date.now()}`,
      name,
      type: "dental",
      price: priceNum,
      priceUnit: "per_unit",
      discount,
      discountUnit: formDiscountUnit,
      gstPct,
    }

    addItem(item)
    onSaved?.(item)
    onOpenChange(false)
  }

  return (
    <TPDrawer open={open} onOpenChange={onOpenChange}>
      <TPDrawerContent
        side="right"
        size="lg"
        overlayClassName="!z-[100]"
        className={clsx("!gap-0 !p-0 !rounded-none !z-[100]", styles.drawerSheet)}
      >
        <DrawerHeader
          title="Add dental service"
          titleClassName={styles.billingDrawerTitle}
          onClose={() => onOpenChange(false)}
          action={
            <Button
              type="button"
              variant="solid"
              theme="primary"
              size="sm"
              surface="light"
              className={styles.drawerSaveCompact}
              onClick={handleSave}
            >
              Save
            </Button>
          }
        />
        <div className={styles.drawerBody}>
          <form
            id={formId}
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault()
              handleSave()
            }}
          >
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${formId}-name`}>
                Dental service name
              </label>
              <input
                id={`${formId}-name`}
                className={styles.drawerInput}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g., Ceramic crown"
                autoFocus
              />
              {formErrors.name ? <p className={styles.fieldError}>{formErrors.name}</p> : null}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${formId}-price`}>
                Price (₹)
                <span className={styles.requiredMark} aria-hidden>
                  {" "}
                  *
                </span>
              </label>
              <input
                id={`${formId}-price`}
                className={clsx(styles.drawerInput, formErrors.price && styles.drawerInputError)}
                inputMode="decimal"
                value={formPrice}
                onChange={(e) => {
                  setFormPrice(sanitizeDecimal(e.target.value))
                  if (formErrors.price) setFormErrors((er) => ({ ...er, price: "" }))
                }}
                placeholder="0"
              />
              {formErrors.price ? <p className={styles.fieldError}>{formErrors.price}</p> : null}
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={`${formId}-gst`}>
                  GST (%)
                </label>
                <div className={styles.inputAffix}>
                  <input
                    id={`${formId}-gst`}
                    className={styles.drawerInputAffixedGst}
                    inputMode="decimal"
                    value={formGst}
                    onChange={(e) => setFormGst(sanitizeDecimal(e.target.value))}
                    placeholder="—"
                  />
                  <span className={styles.inputAffixSuffix} aria-hidden>
                    %
                  </span>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={`${formId}-disc`}>
                  Discount
                </label>
                <div className={styles.discountInline}>
                  <input
                    id={`${formId}-disc`}
                    className={styles.discountInlineInput}
                    inputMode="decimal"
                    value={formDiscount}
                    onChange={(e) => setFormDiscount(sanitizeDecimal(e.target.value))}
                    placeholder="0"
                    aria-label={formDiscountUnit === "percent" ? "Discount percent" : "Discount amount"}
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setFormDiscountUnit(formDiscountUnit === "inr" ? "percent" : "inr")}
                    className={styles.discountUnitSwitch}
                    title={formDiscountUnit === "inr" ? "Switch to %" : "Switch to ₹"}
                  >
                    <span>{formDiscountUnit === "inr" ? "₹" : "%"}</span>
                    <span className={styles.discountUnitChevrons} aria-hidden>
                      <ArrowUp2 size={8} color="currentColor" variant="Bold" />
                      <ArrowDown2 size={8} color="currentColor" variant="Bold" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className={styles.drawerTotalFooter} aria-live="polite">
            <div>
              <p className={styles.drawerTotalLabel}>Total amount (incl. GST)</p>
              {drawerPreviewTotal === null ? (
                <p className={styles.drawerTotalHint}>Enter a valid price to see the total.</p>
              ) : null}
            </div>
            <p className={styles.drawerTotalValue}>
              {drawerPreviewTotal === null ? "—" : formatBillingInr(drawerPreviewTotal)}
            </p>
          </div>

          <div
            className={clsx(styles.drawerCatalogCallout, styles.drawerCatalogCalloutInline)}
            role="note"
          >
            <InfoCircle size={16} variant="Bold" className={styles.drawerCatalogCalloutIcon} aria-hidden />
            <p className={styles.drawerCatalogCalloutNote}>
              After you save, this name and price can be picked again in the dental exam, treatment plan, and
              billing—keep the name short and easy to read.
            </p>
          </div>
        </div>
      </TPDrawerContent>
    </TPDrawer>
  )
}
